import { meta, journeys } from './data.js';

gsap.registerPlugin(MotionPathPlugin);

const SVG_NS = 'http://www.w3.org/2000/svg';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MIN_SCALE = 0.2;
const MAX_SCALE = 2;
const INITIAL_MIN_SCALE = 0.55;

const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const svg = (tag, attrs = {}) => {
  const n = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const dom = {
  tabs: $('#tabs'),
  indicator: $('#tab-indicator'),
  stage: $('#stage'),
  canvas: $('#canvas'),
  world: $('#world'),
  comingSoon: $('#coming-soon'),
  comingSoonName: $('#coming-soon-name'),
  legend: $('#legend'),
  legendItems: $('#legend .legend'),
  controls: $('#controls'),
  zoomLevel: $('#zoom-level'),
  tourBtn: $('#tour-btn'),
  scrim: $('#scrim'),
  flyout: $('#flyout'),
  flyScroll: $('#fly-scroll'),
  flyShot: $('#fly-shot'),
  flyDetail: $('#fly-detail'),
  flyStep: $('#fly-step'),
  flyPrev: $('#fly-prev'),
  flyNext: $('#fly-next'),
  flyClose: $('#fly-close'),
};

const state = {
  journey: null,
  cam: { x: 0, y: 0, s: 1 },
  cards: new Map(),
  edges: [],
  particles: [],
  activeId: null,
  flyoutOpen: false,
  tour: null,
  shotTween: null,
  userMoved: false,
};

/* ------------------------------------------------------------------ */
/* Header + tabs                                                       */
/* ------------------------------------------------------------------ */

$('#app-title').textContent = meta.title;
$('#data-source').textContent = `${meta.source} ${meta.dateRange}`;
$('#market-code').textContent = meta.market.code;

journeys.forEach((j) => {
  const tab = el('button', 'tab');
  tab.type = 'button';
  tab.setAttribute('role', 'tab');
  tab.dataset.id = j.id;
  tab.innerHTML = escapeHtml(j.name) + (j.status === 'coming-soon' ? '<span class="tab__badge">Soon</span>' : '');
  tab.addEventListener('click', () => selectJourney(j.id));
  dom.tabs.appendChild(tab);
});

function moveIndicator(animate = true) {
  const tab = dom.tabs.querySelector('[aria-selected="true"]');
  if (!tab) return;
  const vars = { x: tab.offsetLeft - dom.tabs.scrollLeft, width: tab.offsetWidth };
  if (animate && !reduceMotion) gsap.to(dom.indicator, { ...vars, duration: 0.5, ease: 'power3.out' });
  else gsap.set(dom.indicator, vars);
}
dom.tabs.addEventListener('scroll', () => moveIndicator(false));

/* ------------------------------------------------------------------ */
/* Journey selection                                                   */
/* ------------------------------------------------------------------ */

const DEFAULT_LEGEND = [
  { kind: 'flow', label: 'Customer flow' },
  { kind: 'finding', label: 'Findings' },
];

function renderLegend(journey) {
  const items = journey.legend || DEFAULT_LEGEND;
  dom.legendItems.innerHTML = items.map((i) => `<span class="legend__item"><span class="legend__swatch legend__swatch--${i.kind}">${
    { finding: '⚠', 'aud-m': 'M', 'aud-brp': 'BrP', delay: ICONS.clock }[i.kind] || ''}</span>${escapeHtml(i.label)}</span>`).join('');
}

function selectJourney(id, { intro = true, openNode = null } = {}) {
  const journey = journeys.find((j) => j.id === id) || journeys[0];
  const changed = state.journey?.id !== journey.id;
  dom.tabs.querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.id === journey.id)));
  moveIndicator(true);
  if (!changed && !openNode) return;

  stopTour();
  if (state.flyoutOpen) closeFlyout(false);
  state.journey = journey;

  if (changed) {
    teardownCanvas();
    if (journey.status === 'coming-soon') {
      showComingSoon(journey);
    } else {
      hideComingSoon();
      renderLegend(journey);
      buildCanvas(journey);
      state.userMoved = false;
      fitView(false, true);
      if (intro) playIntro();
      else startParticles();
    }
  }
  updateHash(openNode);
  if (openNode && journey.nodes) {
    const node = journey.nodes.find((n) => n.id === openNode);
    if (node) openFlyout(node);
  }
}

function updateHash(nodeId) {
  const hash = `#${state.journey.id}${nodeId ? `/${nodeId}` : ''}`;
  if (location.hash !== hash) history.replaceState(null, '', hash);
}

/* ------------------------------------------------------------------ */
/* Canvas build                                                        */
/* ------------------------------------------------------------------ */

function teardownCanvas() {
  state.particles.forEach((t) => t.kill());
  state.particles = [];
  gsap.killTweensOf(dom.world.querySelectorAll('*'));
  dom.world.innerHTML = '';
  state.cards.clear();
  state.edges = [];
  state.activeId = null;
}

const listOf = (journey, key) => journey[key] || [];

// Every placed element on a journey canvas, as boxes keyed by kind.
function elementBoxes(journey) {
  return [
    ...journey.nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, w: n.w, h: n.h, kind: 'node' })),
    ...listOf(journey, 'decisions').map((d) => ({ id: d.id, x: d.x, y: d.y, w: d.size, h: d.size, kind: 'decision' })),
    ...listOf(journey, 'groups').map((g) => ({ id: g.id, x: g.x, y: g.y, w: g.w, h: g.h, kind: 'group' })),
    ...listOf(journey, 'terminals').map((t) => ({ id: t.id, x: t.x, y: t.y, w: t.w, h: t.h, kind: 'terminal' })),
    ...listOf(journey, 'triggers').map((t) => ({ id: t.id, x: t.x, y: t.y, w: t.w, h: t.h, kind: 'trigger' })),
    ...listOf(journey, 'notes').map((t) => ({ id: t.id, x: t.x, y: t.y, w: t.w, h: t.h, kind: 'note' })),
    ...listOf(journey, 'ghosts').map((t) => ({ id: t.id, x: t.x, y: t.y, w: t.w, h: t.h, kind: 'ghost' })),
  ];
}

function boxOf(journey, id) {
  const b = elementBoxes(journey).find((x) => x.id === id);
  if (!b) throw new Error(`Unknown journey element: ${id}`);
  return b;
}

function anchor(b, side) {
  // Decisions are upward-pointing triangles (UML), so side connectors meet the slanted edges at mid-height.
  if (b.kind === 'decision' && (side === 'l' || side === 'r')) {
    return [side === 'l' ? b.x + b.w / 4 : b.x + (b.w * 3) / 4, b.y + b.h / 2];
  }
  switch (side) {
    case 'l': return [b.x, b.y + b.h / 2];
    case 't': return [b.x + b.w / 2, b.y];
    case 'b': return [b.x + b.w / 2, b.y + b.h];
    default: return [b.x + b.w, b.y + b.h / 2];
  }
}

const isHoriz = (side) => side === 'l' || side === 'r';

function routeEdge(journey, e) {
  const fromSide = e.fromSide || 'r';
  const toSide = e.toSide || 'l';
  const fb = boxOf(journey, e.from);
  const tb = boxOf(journey, e.to);
  const [x1, y1] = anchor(fb, fromSide);
  let [x2, y2] = anchor(tb, toSide);

  // Explicit routing: the first and last waypoints snap to the anchors so every segment stays orthogonal.
  if (e.via?.length) {
    const pts = [[x1, y1], ...e.via.map((p) => [...p]), [x2, y2]];
    const first = pts[1];
    const last = pts[pts.length - 2];
    if (isHoriz(fromSide)) first[1] = y1; else first[0] = x1;
    if (isHoriz(toSide)) last[1] = y2; else last[0] = x2;
    return pts;
  }

  // Keep vertical drops straight when the target is wide enough to receive them.
  if (!isHoriz(fromSide) && !isHoriz(toSide) && x1 > tb.x && x1 < tb.x + tb.w) x2 = x1;
  if (isHoriz(fromSide) && isHoriz(toSide) && Math.abs(y1 - y2) < 3) y2 = y1;

  if (isHoriz(fromSide) && isHoriz(toSide)) {
    if (y1 === y2) return [[x1, y1], [x2, y2]];
    const mx = (x1 + x2) / 2;
    return [[x1, y1], [mx, y1], [mx, y2], [x2, y2]];
  }
  if (!isHoriz(fromSide) && !isHoriz(toSide)) {
    if (x1 === x2) return [[x1, y1], [x2, y2]];
    const my = (y1 + y2) / 2;
    return [[x1, y1], [x1, my], [x2, my], [x2, y2]];
  }
  if (isHoriz(fromSide)) return [[x1, y1], [x2, y1], [x2, y2]];
  return [[x1, y1], [x1, y2], [x2, y2]];
}

function roundedPath(pts, radius = 14) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(radius, l1 / 2, l2 / 2);
    const ax = cx + ((px - cx) / l1) * r;
    const ay = cy + ((py - cy) / l1) * r;
    const bx = cx + ((nx - cx) / l2) * r;
    const by = cy + ((ny - cy) / l2) * r;
    d += ` L${ax},${ay} Q${cx},${cy} ${bx},${by}`;
  }
  const last = pts[pts.length - 1];
  return `${d} L${last[0]},${last[1]}`;
}

const ICONS = {
  open: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
  email: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path class="clock__hour" d="M12 12V8.5"/><path class="clock__minute" d="M12 12h4"/></svg>',
  account: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/></svg>',
};

const findingsLabel = (f) => (typeof f === 'number' ? `${f} Finding${f === 1 ? '' : 's'}` : `${f} Findings`);
const audienceClass = (a) => `aud aud--${a.code.toLowerCase()}`;

function place(n, b) {
  Object.assign(n.style, { left: `${b.x}px`, top: `${b.y}px`, width: `${b.w}px`, height: `${b.h}px` });
  return n;
}

function cardTags(node) {
  if (!node.flow) return '';
  return `<span class="card__tags">
      ${node.ref ? `<span class="ref">${escapeHtml(node.ref)}</span>` : ''}
      ${node.audience ? `<span class="${audienceClass(node.audience)}" title="${escapeHtml(node.audience.label)}">${escapeHtml(node.audience.code)}</span>` : ''}
      ${node.type === 'email' ? `<span class="kind" title="Email">${ICONS.email}Email</span>` : ''}
      <span class="card__open" aria-hidden="true">${ICONS.open}</span>
    </span>`;
}

function buildCanvas(journey) {
  const { width, height } = journey;
  dom.world.style.width = `${width}px`;
  dom.world.style.height = `${height}px`;

  listOf(journey, 'groups').forEach((g) => {
    const n = place(el('div', 'group', `<span class="group__label">${escapeHtml(g.label)}</span>`), g);
    n.dataset.id = g.id;
    dom.world.appendChild(n);
  });

  const svgRoot = svg('svg', { class: 'edges', width, height, viewBox: `0 0 ${width} ${height}` });
  const defs = svg('defs');
  const marker = (id, fill) => {
    const m = svg('marker', { id, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 9, markerHeight: 9, orient: 'auto-start-reverse', markerUnits: 'userSpaceOnUse' });
    const head = svg('path', { d: 'M0,0.5 L10,5 L0,9.5 z', class: 'arrowhead' });
    if (fill) head.style.fill = fill;
    m.appendChild(head);
    return m;
  };
  defs.append(
    marker('arrow'),
    marker('arrow-lit', 'var(--ori-secondary-main)'),
    marker('arrow-none', 'var(--flow-none)'),
  );
  svgRoot.appendChild(defs);
  const edgeLayer = svg('g');
  const particleLayer = svg('g');
  const labelLayer = svg('g');
  svgRoot.append(edgeLayer, particleLayer, labelLayer);
  dom.world.appendChild(svgRoot);

  journey.edges.forEach((e) => {
    const pts = routeEdge(journey, e);
    const none = e.style === 'none';
    const path = svg('path', { d: roundedPath(pts), class: `edge${none ? ' edge--none' : ''}`, 'marker-end': none ? 'url(#arrow-none)' : 'url(#arrow)' });
    edgeLayer.appendChild(path);
    const len = path.getTotalLength();
    const rec = { ...e, path, len, labelEl: null, flagEl: null, particles: [], startX: Math.min(pts[0][0], pts[pts.length - 1][0]) };

    if (e.label) {
      const p = path.getPointAtLength(len * (e.labelAt ?? 0.5));
      const q = path.getPointAtLength(Math.min(len, len * (e.labelAt ?? 0.5) + 1));
      const vertical = Math.abs(q.x - p.x) < Math.abs(q.y - p.y);
      const t = svg('text', {
        class: 'edge-label',
        x: vertical ? p.x + 10 : p.x,
        y: vertical ? p.y + 4 : p.y - 9,
        'text-anchor': vertical ? 'start' : 'middle',
      });
      t.textContent = e.label;
      labelLayer.appendChild(t);
      rec.labelEl = t;
    }

    if (e.delay) {
      const p = path.getPointAtLength(len / 2);
      const d = el('div', 'delay', `<span class="delay__icon" aria-hidden="true">${ICONS.clock}</span>
        <span class="delay__text"><strong>${escapeHtml(e.delay.wait)}</strong>${e.delay.day ? `<span>${escapeHtml(e.delay.day)}</span>` : ''}</span>`);
      d.setAttribute('role', 'note');
      d.setAttribute('aria-label', `Time delay: ${[e.delay.wait, e.delay.day].filter(Boolean).join(', ')}`);
      Object.assign(d.style, { left: `${p.x}px`, top: `${p.y}px` });
      dom.world.appendChild(d);
      rec.delayEl = d;
    }

    if (e.flag) {
      const p = path.getPointAtLength(len * (e.flagAt ?? 0.5));
      const f = el('div', 'flag flag--edge', `<span aria-hidden="true">⚠</span> ${escapeHtml(e.flag)}`);
      Object.assign(f.style, { left: `${p.x}px`, top: `${p.y}px` });
      dom.world.appendChild(f);
      rec.flagEl = f;
    }

    if (!none) {
      const count = Math.max(1, Math.round(len / 160));
      for (let i = 0; i < count; i++) {
        const c = svg('circle', { r: 3, class: 'particle', opacity: 0 });
        particleLayer.appendChild(c);
        rec.particles.push(c);
      }
    }
    state.edges.push(rec);
  });

  listOf(journey, 'decisions').forEach((d) => {
    const n = el('div', 'decision', `
      <svg class="decision__shape" viewBox="0 0 ${d.size} ${d.size}" aria-hidden="true">
        <polygon points="${d.size / 2},1.5 ${d.size - 1.5},${d.size - 1.5} 1.5,${d.size - 1.5}" />
      </svg>
      <span class="decision__label">${escapeHtml(d.label)}</span>`);
    place(n, { x: d.x, y: d.y, w: d.size, h: d.size });
    n.dataset.id = d.id;
    dom.world.appendChild(n);
  });

  listOf(journey, 'terminals').forEach((t) => {
    const n = place(el('div', `terminal${t.w < 100 ? ' terminal--small' : ''}`,
      `${t.tag ? `<span class="terminal__tag">${escapeHtml(t.tag)}</span>` : ''}<span class="terminal__label">${escapeHtml(t.label)}</span>`), t);
    n.dataset.id = t.id;
    dom.world.appendChild(n);
  });

  listOf(journey, 'triggers').forEach((t) => {
    const n = place(el('div', `trigger trigger--${t.variant}`,
      t.icon
        ? `<span class="trigger__icon" role="img" aria-label="${escapeHtml(t.label)} icon">${ICONS[t.icon]}</span>`
        : `${t.caption ? `<span class="trigger__caption">${escapeHtml(t.caption)}</span>` : ''}<span class="trigger__label">${escapeHtml(t.label)}</span>`), t);
    n.dataset.id = t.id;
    n.title = `UI element: ${t.caption ? `${t.caption} – ` : ''}${t.label}`;
    dom.world.appendChild(n);
  });

  listOf(journey, 'ghosts').forEach((t) => {
    const n = place(el('div', 'ghost', `<span class="ghost__label">${escapeHtml(t.label)}</span><span class="ghost__caption">${escapeHtml(t.caption)}</span>`), t);
    n.dataset.id = t.id;
    dom.world.appendChild(n);
  });

  listOf(journey, 'notes').forEach((t) => {
    const n = place(el('div', 'sticky', `<span class="sticky__text">${escapeHtml(t.text)}</span><span class="sticky__author">${escapeHtml(t.author)}</span>`), t);
    n.dataset.id = t.id;
    dom.world.appendChild(n);
  });

  journey.nodes.forEach((node) => {
    const card = el('button', `card${node.flow ? ' card--flow' : ''}${node.type === 'email' ? ' card--email' : ''}`);
    card.type = 'button';
    card.dataset.id = node.id;
    const title = [node.ref, node.fullName || node.name, node.audience && `(${node.audience.label})`].filter(Boolean).join(' ');
    card.setAttribute('aria-label', `${title}: ${node.visits} visits, ${node.rate} to ${node.next}, ${findingsLabel(node.findings)}. Open detail.`);
    place(card, node);
    card.innerHTML = `
      <span class="card__head">
        ${cardTags(node)}
        <span class="card__name">${escapeHtml(node.name)}</span>
        ${node.flow ? '' : `<span class="card__open" aria-hidden="true">${ICONS.open}</span>`}
      </span>
      <span class="card__body">
        <span class="card__row"><strong>${escapeHtml(node.visits)}</strong> Visits</span>
        <span class="card__row"><strong>${escapeHtml(node.rate)}</strong><span class="card__arrow">→</span><span class="card__next">${escapeHtml(node.next)}</span></span>
        <span class="card__meter"><span data-w="${parseFloat(node.rate) || 0}"></span></span>
        <span class="card__findings${typeof node.findings === 'number' ? '' : ' is-tbd'}"><span aria-hidden="true">⚠</span> ${escapeHtml(findingsLabel(node.findings))}</span>
      </span>`;
    card.addEventListener('click', (ev) => {
      if (dragState.suppressClick) { ev.preventDefault(); return; }
      stopTour();
      openFlyout(node);
    });
    card.addEventListener('mouseenter', () => !state.tour && lightEdgesFor(node.id));
    card.addEventListener('mouseleave', () => !state.tour && lightEdgesFor(state.activeId));
    card.addEventListener('focus', () => !state.tour && lightEdgesFor(node.id));
    dom.world.appendChild(card);
    state.cards.set(node.id, card);

    if (node.flag) {
      const f = el('div', 'flag flag--node', `<span aria-hidden="true">⚠</span> ${escapeHtml(node.flag)}`);
      Object.assign(f.style, { left: `${node.x + node.w / 2}px`, top: `${node.y + node.h + 16}px` });
      dom.world.appendChild(f);
    }
  });
}

function groupMembers(journey, groupId) {
  const g = listOf(journey, 'groups').find((x) => x.id === groupId);
  if (!g) return [];
  return journey.nodes
    .filter((n) => n.x >= g.x && n.y >= g.y && n.x + n.w <= g.x + g.w && n.y + n.h <= g.y + g.h)
    .map((n) => n.id);
}

function edgeTouches(edge, id) {
  const j = state.journey;
  const ends = [edge.from, edge.to].flatMap((e) => [e, ...groupMembers(j, e)]);
  return ends.includes(id);
}

function lightEdgesFor(id) {
  state.edges.forEach((e) => {
    const lit = id != null && edgeTouches(e, id);
    e.path.classList.toggle('is-lit', lit);
    if (e.style !== 'none') e.path.setAttribute('marker-end', lit ? 'url(#arrow-lit)' : 'url(#arrow)');
  });
}

function setActive(id, { dimOthers = false } = {}) {
  state.activeId = id;
  state.cards.forEach((c, cid) => {
    c.classList.toggle('is-active', cid === id);
    c.classList.toggle('is-dim', dimOthers && id != null && cid !== id);
  });
  lightEdgesFor(id);
}

/* ------------------------------------------------------------------ */
/* Animation                                                           */
/* ------------------------------------------------------------------ */

function playIntro() {
  if (reduceMotion) {
    revealStatic();
    startParticles();
    return;
  }
  // Flags and delays are centred with a CSS transform, so they fade in rather than move.
  const cards = [...dom.world.querySelectorAll('.card, .terminal, .trigger, .sticky, .ghost, .flag, .delay')]
    .sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left));
  const xs = cards.map((c) => parseFloat(c.style.left));
  const span = Math.max(...xs) - Math.min(...xs) || 1;
  const minX = Math.min(...xs);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: startParticles });

  const total = span > 4000 ? 2.6 : 1.6;
  tl.from(dom.world.querySelectorAll('.group, .decision'), { opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.1, clearProps: 'opacity,transform' }, 0.3);
  cards.forEach((c, i) => {
    const at = ((xs[i] - minX) / span) * total;
    if (c.classList.contains('flag') || c.classList.contains('delay')) {
      tl.from(c, { opacity: 0, duration: 0.5, clearProps: 'opacity' }, at + 0.4);
      return;
    }
    tl.from(c, { opacity: 0, y: 28, scale: 0.92, duration: 0.7, clearProps: 'opacity,transform' }, at);
    const meter = c.querySelector('.card__meter span');
    if (meter) tl.to(meter, { width: `${meter.dataset.w}%`, duration: 0.9 }, at + 0.35);
  });
  state.edges.forEach((e) => {
    const at = (Math.max(0, e.startX - minX) / span) * total + 0.35;
    if (e.style === 'none') {
      tl.from(e.path, { opacity: 0, duration: 0.6, clearProps: 'opacity' }, at + 0.3);
      return;
    }
    gsap.set(e.path, { strokeDasharray: e.len, strokeDashoffset: e.len });
    tl.to(e.path, { strokeDashoffset: 0, duration: Math.min(0.9, 0.3 + e.len / 600), ease: 'power2.inOut' }, at);
    tl.set(e.path, { clearProps: 'strokeDasharray,strokeDashoffset' });
    if (e.labelEl) tl.from(e.labelEl, { opacity: 0, duration: 0.4 }, at + 0.5);
  });
  tl.from([dom.legend, dom.controls], { opacity: 0, y: 12, duration: 0.6, stagger: 0.1 }, 1.2);
}

function revealStatic() {
  state.cards.forEach((c) => {
    const m = c.querySelector('.card__meter span');
    m.style.width = `${m.dataset.w}%`;
  });
}

function startParticles() {
  if (reduceMotion) return;
  dom.world.querySelectorAll('.delay').forEach((d, i) => {
    const minute = d.querySelector('.clock__minute');
    const hour = d.querySelector('.clock__hour');
    state.particles.push(
      gsap.to(minute, { rotation: 360, svgOrigin: '12 12', duration: 2.4, ease: 'none', repeat: -1, delay: i * 0.3 }),
      gsap.to(hour, { rotation: 360, svgOrigin: '12 12', duration: 28.8, ease: 'none', repeat: -1, delay: i * 0.3 }),
    );
  });
  state.edges.forEach((e) => {
    const duration = Math.max(1.4, e.len / 90);
    e.particles.forEach((p, i) => {
      const tween = gsap.to(p, {
        motionPath: { path: e.path, align: e.path, alignOrigin: [0.5, 0.5] },
        duration,
        ease: 'none',
        repeat: -1,
        delay: (duration / e.particles.length) * i,
        onStart: () => gsap.to(p, { opacity: 0.85, duration: 0.4 }),
      });
      state.particles.push(tween);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Camera: pan, zoom, fit                                              */
/* ------------------------------------------------------------------ */

function applyCam() {
  const { x, y, s } = state.cam;
  dom.world.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
  dom.zoomLevel.textContent = `${Math.round(s * 100)}%`;
}

// Where the camera is heading; lets rapid zoom clicks compound instead of cancelling.
const camTarget = { x: 0, y: 0, s: 1 };

function tweenCam(target, duration = 0.8, ease = 'power3.inOut') {
  gsap.killTweensOf(state.cam);
  Object.assign(camTarget, state.cam, target);
  if (reduceMotion || duration === 0) {
    Object.assign(state.cam, target);
    applyCam();
    return null;
  }
  return gsap.to(state.cam, { ...target, duration, ease, onUpdate: applyCam });
}

function contentBounds() {
  const j = state.journey;
  const boxes = elementBoxes(j);
  const minX = Math.min(...boxes.map((b) => b.x));
  const minY = Math.min(...boxes.map((b) => b.y));
  const maxX = Math.max(...boxes.map((b) => b.x + b.w));
  const maxY = Math.max(...boxes.map((b) => b.y + b.h));
  return { minX, minY, w: maxX - minX, h: maxY - minY };
}

function fitView(animate = true, initial = false) {
  if (!state.journey?.nodes) return;
  const r = dom.canvas.getBoundingClientRect();
  const b = contentBounds();
  const pad = r.width < 820 ? 24 : 64;
  const hudSpace = 70;
  let s = Math.min((r.width - pad * 2) / b.w, (r.height - pad - hudSpace) / b.h, 1);
  if (initial) s = Math.max(s, Math.min(INITIAL_MIN_SCALE, (r.height - pad - hudSpace) / b.h));
  s = Math.max(MIN_SCALE, s);
  const overflowsX = b.w * s > r.width - pad * 2;
  const x = overflowsX ? pad - b.minX * s : (r.width - b.w * s) / 2 - b.minX * s;
  const y = (r.height - hudSpace - b.h * s) / 2 - b.minY * s + 10;
  tweenCam({ x, y, s }, animate ? 0.9 : 0);
}

function zoomAt(factor, px, py, duration = 0.35) {
  state.userMoved = true;
  const { x, y, s } = gsap.isTweening(state.cam) ? camTarget : state.cam;
  const ns = gsap.utils.clamp(MIN_SCALE, MAX_SCALE, s * factor);
  const k = ns / s;
  tweenCam({ s: ns, x: px - (px - x) * k, y: py - (py - y) * k }, duration, 'power2.out');
}

function zoomCenter(factor) {
  const r = dom.canvas.getBoundingClientRect();
  zoomAt(factor, r.width / 2, r.height / 2);
}

function centerOn(node, s = 1, duration = 1) {
  const r = dom.canvas.getBoundingClientRect();
  const scale = Math.min(s, (r.width - 40) / (node.w * 2.2));
  return tweenCam({
    s: scale,
    x: r.width / 2 - (node.x + node.w / 2) * scale,
    y: (r.height - 70) / 2 - (node.y + node.h / 2) * scale,
  }, duration, 'power3.inOut');
}

// Focusing a card can scroll these overflow:hidden containers; the camera owns positioning.
[dom.stage, dom.canvas].forEach((n) => n.addEventListener('scroll', () => { n.scrollLeft = 0; n.scrollTop = 0; }));

const dragState = { pointers: new Map(), startX: 0, startY: 0, camX: 0, camY: 0, moved: false, suppressClick: false, pinch: null };

dom.canvas.addEventListener('pointerdown', (e) => {
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  stopTour();
  gsap.killTweensOf(state.cam);
  dragState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  dragState.suppressClick = false;
  if (dragState.pointers.size === 1) {
    dragState.startX = e.clientX;
    dragState.startY = e.clientY;
    dragState.camX = state.cam.x;
    dragState.camY = state.cam.y;
    dragState.moved = false;
  } else if (dragState.pointers.size === 2) {
    const [a, b] = [...dragState.pointers.values()];
    dragState.pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y), s: state.cam.s, x: state.cam.x, y: state.cam.y, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
  }
});

window.addEventListener('pointermove', (e) => {
  if (!dragState.pointers.has(e.pointerId)) return;
  dragState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  const rect = dom.canvas.getBoundingClientRect();
  if (dragState.pointers.size === 2 && dragState.pinch) {
    const [a, b] = [...dragState.pointers.values()];
    const p = dragState.pinch;
    const ns = gsap.utils.clamp(MIN_SCALE, MAX_SCALE, p.s * (Math.hypot(a.x - b.x, a.y - b.y) / p.dist));
    const k = ns / p.s;
    const cx = p.cx - rect.left;
    const cy = p.cy - rect.top;
    const mx = (a.x + b.x) / 2 - p.cx;
    const my = (a.y + b.y) / 2 - p.cy;
    Object.assign(state.cam, { s: ns, x: cx - (cx - p.x) * k + mx, y: cy - (cy - p.y) * k + my });
    dragState.moved = true;
    state.userMoved = true;
    applyCam();
    return;
  }
  const dx = e.clientX - dragState.startX;
  const dy = e.clientY - dragState.startY;
  if (!dragState.moved && Math.hypot(dx, dy) > 4) {
    dragState.moved = true;
    dom.canvas.classList.add('is-dragging');
  }
  if (dragState.moved) {
    state.userMoved = true;
    state.cam.x = dragState.camX + dx;
    state.cam.y = dragState.camY + dy;
    applyCam();
  }
});

const endPointer = (e) => {
  if (!dragState.pointers.has(e.pointerId)) return;
  dragState.pointers.delete(e.pointerId);
  if (dragState.pointers.size < 2) dragState.pinch = null;
  if (dragState.pointers.size === 1) {
    const [p] = [...dragState.pointers.values()];
    Object.assign(dragState, { startX: p.x, startY: p.y, camX: state.cam.x, camY: state.cam.y });
  }
  if (dragState.pointers.size === 0) {
    dom.canvas.classList.remove('is-dragging');
    dragState.suppressClick = dragState.moved;
    setTimeout(() => { dragState.suppressClick = false; }, 0);
  }
};
window.addEventListener('pointerup', endPointer);
window.addEventListener('pointercancel', endPointer);

dom.canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  stopTour();
  state.userMoved = true;
  const rect = dom.canvas.getBoundingClientRect();
  if (e.ctrlKey || e.metaKey) {
    gsap.killTweensOf(state.cam);
    const factor = Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0025) * (e.ctrlKey && !e.metaKey ? 4 : 1));
    const ns = gsap.utils.clamp(MIN_SCALE, MAX_SCALE, state.cam.s * factor);
    const k = ns / state.cam.s;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    Object.assign(state.cam, { s: ns, x: px - (px - state.cam.x) * k, y: py - (py - state.cam.y) * k });
    applyCam();
  } else {
    gsap.killTweensOf(state.cam);
    const unit = e.deltaMode === 1 ? 16 : 1;
    const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
    const dy = e.shiftKey && !e.deltaX ? 0 : e.deltaY;
    state.cam.x -= dx * unit;
    state.cam.y -= dy * unit;
    applyCam();
  }
}, { passive: false });

dom.canvas.addEventListener('keydown', (e) => {
  if (e.target !== dom.canvas) return;
  const step = 80;
  const moves = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
  if (moves[e.key]) {
    e.preventDefault();
    state.userMoved = true;
    tweenCam({ x: state.cam.x + moves[e.key][0], y: state.cam.y + moves[e.key][1] }, 0.3, 'power2.out');
  } else if (e.key === '+' || e.key === '=') zoomCenter(1.25);
  else if (e.key === '-') zoomCenter(0.8);
  else if (e.key === '0') fitView();
});

$('#zoom-in').addEventListener('click', () => { stopTour(); zoomCenter(1.25); });
$('#zoom-out').addEventListener('click', () => { stopTour(); zoomCenter(0.8); });
$('#zoom-fit').addEventListener('click', () => { stopTour(); fitView(); });

// Keep the journey framed while the viewport settles, until the user takes control of the camera.
let resizeRaf = 0;
new ResizeObserver(() => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    moveIndicator(false);
    if (!state.userMoved && !state.tour) fitView(false, true);
  });
}).observe(dom.canvas);

/* ------------------------------------------------------------------ */
/* Walkthrough                                                         */
/* ------------------------------------------------------------------ */

function startTour() {
  const j = state.journey;
  if (!j?.nodes) return;
  if (state.flyoutOpen) closeFlyout();
  dom.tourBtn.setAttribute('aria-pressed', 'true');
  dom.tourBtn.querySelector('span').textContent = 'Stop';
  const tl = gsap.timeline({ onComplete: () => { stopTour(); fitView(); } });
  j.nodes.forEach((node, i) => {
    tl.add(() => centerOn(node, 1, i === 0 ? 1.1 : 0.9));
    tl.add(() => setActive(node.id, { dimOthers: true }), '+=0.45');
    tl.fromTo(state.cards.get(node.id), { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, '<');
    tl.to({}, { duration: 1.3 });
  });
  state.tour = tl;
}

function stopTour() {
  if (!state.tour) return;
  state.tour.kill();
  state.tour = null;
  dom.tourBtn.setAttribute('aria-pressed', 'false');
  dom.tourBtn.querySelector('span').textContent = 'Walkthrough';
  state.cards.forEach((c) => gsap.set(c, { scale: 1 }));
  setActive(state.flyoutOpen ? state.activeId : null);
}

dom.tourBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
dom.tourBtn.addEventListener('click', () => (state.tour ? stopTour() : startTour()));

/* ------------------------------------------------------------------ */
/* Flyout                                                              */
/* ------------------------------------------------------------------ */

gsap.set(dom.flyout, { xPercent: 105 });

function parseValue(v) {
  const m = String(v).match(/^([\d.]+)(.*)$/);
  if (!m) return null;
  return { num: parseFloat(m[1]), decimals: (m[1].split('.')[1] || '').length, suffix: m[2] };
}

function statList(rows, { bars = true } = {}) {
  const pcts = rows.map((r) => (String(r.value).endsWith('%') ? parseFloat(r.value) : null));
  const max = Math.max(...pcts.filter((p) => p != null), 1);
  return `<ul class="stats">${rows.map((r, i) => {
    const pct = pcts[i];
    const bar = bars && pct != null
      ? `<span class="stat__bar"><span data-w="${(pct / max) * 100}"></span></span>`
      : '<span class="stat__bar stat__bar--none"></span>';
    return `<li class="stat"><span>${escapeHtml(r.label)}</span>${bar}<span class="stat__value" data-v="${escapeHtml(r.value)}">${escapeHtml(r.value)}</span></li>`;
  }).join('')}</ul>`;
}

function renderDetail(node) {
  const d = node.detail;
  const title = node.fullName || node.name;

  dom.flyShot.innerHTML = d.screenshot
    ? `<div class="shot__frame is-scrollable" tabindex="0" aria-label="Scrollable screenshot of ${escapeHtml(title)}"><img src="${d.screenshot}" alt="Screenshot of the ${escapeHtml(title)}" /></div>
       <figcaption class="shot__caption" hidden>Scroll to explore the page</figcaption>`
    : d.screenshotPending
      ? `<div class="shot__frame shot__frame--pending"><span>${escapeHtml(d.screenshotPending)}</span></div>`
      : `<div class="shot__frame"><div class="shot__placeholder">
         <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/><circle cx="15.5" cy="8.5" r="1.5"/></svg>
         Screenshot to follow</div></div>`;

  const tags = node.flow ? `<div class="detail__tags">
      ${node.ref ? `<span class="ref">${escapeHtml(node.ref)}</span>` : ''}
      ${node.audience ? `<span class="${audienceClass(node.audience)}">${escapeHtml(node.audience.code)}</span><span class="detail__aud">${escapeHtml(node.audience.label)}</span>` : ''}
      ${node.type === 'email' ? `<span class="kind">${ICONS.email}Email</span>` : ''}
    </div>` : '';

  dom.flyDetail.innerHTML = `${tags}
    <h2 class="detail__title" id="fly-title">${escapeHtml(title)}${d.placeholder ? '<span class="tag">Placeholder data</span>' : ''}</h2>
    <p class="detail__desc">${escapeHtml(d.description)}</p>
    <section class="section"><h3 class="section__title">Key Behaviour</h3>${statList(d.keyBehaviour)}</section>
    <section class="section"><h3 class="section__title">Where did customers come from?</h3>${statList(d.cameFrom)}</section>
    <section class="section"><h3 class="section__title">Where did they go next?</h3>${statList(d.wentNext)}</section>
    <section class="section"><h3 class="section__title">Challenges</h3><div class="notes">
      ${d.challenges.map((c) => `<div class="note note--challenge">${c.title ? `<span class="note__title">${escapeHtml(c.title)}</span>` : ''}<span>${escapeHtml(c.text)}</span>${c.source ? `<span class="note__meta">${escapeHtml(c.source)}</span>` : ''}</div>`).join('')}
    </div></section>
    <section class="section"><h3 class="section__title">Opportunities</h3><div class="notes">
      ${d.opportunities.map((o) => `<div class="note note--opportunity">${o.title ? `<span class="note__title">${escapeHtml(o.title)}</span>` : ''}<span>${escapeHtml(o.text)}</span></div>`).join('')}
    </div></section>`;

  const nodes = state.journey.nodes;
  const idx = nodes.indexOf(node);
  const prev = nodes[idx - 1];
  const next = nodes[idx + 1];
  dom.flyStep.textContent = `${idx + 1} / ${nodes.length}`;
  dom.flyPrev.disabled = !prev;
  dom.flyNext.disabled = !next;
  const navName = (n) => (n ? [n.ref, n.name].filter(Boolean).join(' ') : '');
  dom.flyPrev.querySelector('.navbtn__label').textContent = navName(prev);
  dom.flyNext.querySelector('.navbtn__label').textContent = navName(next);
  dom.flyPrev.onclick = () => prev && openFlyout(prev);
  dom.flyNext.onclick = () => next && openFlyout(next);
}

function animateDetailIn(delay = 0) {
  const blocks = dom.flyDetail.children;
  const bars = dom.flyDetail.querySelectorAll('.stat__bar span');
  const values = dom.flyDetail.querySelectorAll('.stat__value');
  if (reduceMotion) {
    bars.forEach((b) => { b.style.width = `${b.dataset.w}%`; });
    return;
  }
  const tl = gsap.timeline({ delay });
  tl.from(dom.flyShot, { opacity: 0, x: -24, duration: 0.6, ease: 'power3.out' }, 0);
  tl.from(blocks, { opacity: 0, y: 18, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, 0.05);
  bars.forEach((b, i) => tl.to(b, { width: `${b.dataset.w}%`, duration: 0.8, ease: 'power3.out' }, 0.25 + i * 0.03));
  values.forEach((v, i) => {
    const p = parseValue(v.dataset.v);
    if (!p) return;
    const o = { n: 0 };
    tl.to(o, {
      n: p.num, duration: 0.9, ease: 'power2.out',
      onUpdate: () => { v.textContent = `${o.n.toFixed(p.decimals)}${p.suffix}`; },
    }, 0.25 + i * 0.03);
  });
  tl.from(dom.flyDetail.querySelectorAll('.note'), { opacity: 0, x: 16, duration: 0.45, stagger: 0.08, ease: 'power2.out' }, 0.45);
}

function previewScreenshot() {
  state.shotTween?.kill();
  const frame = dom.flyShot.querySelector('.shot__frame.is-scrollable');
  const img = frame?.querySelector('img');
  if (!frame || !img) return;
  const caption = dom.flyShot.querySelector('.shot__caption');
  const run = () => {
    const max = frame.scrollHeight - frame.clientHeight;
    if (caption) caption.hidden = max <= 0;
    if (max <= 0) return;
    if (reduceMotion) return;
    state.shotTween = gsap.to(frame, { scrollTop: Math.min(max, 900), duration: 3.2, delay: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 1, repeatDelay: 0.6 });
  };
  const stop = () => state.shotTween?.kill();
  ['wheel', 'pointerdown', 'touchstart', 'keydown'].forEach((ev) => frame.addEventListener(ev, stop, { passive: true, once: true }));
  if (img.complete) run(); else img.addEventListener('load', run, { once: true });
}

let lastFocus = null;

function openFlyout(node) {
  const switching = state.flyoutOpen;
  setActive(node.id);
  updateHash(node.id);

  if (switching) {
    gsap.to([dom.flyShot, dom.flyDetail], {
      opacity: 0, x: -12, duration: reduceMotion ? 0 : 0.18, ease: 'power2.in',
      onComplete: () => {
        renderDetail(node);
        gsap.set([dom.flyShot, dom.flyDetail], { opacity: 1, x: 0 });
        dom.flyScroll.scrollTop = 0;
        animateDetailIn();
        previewScreenshot();
      },
    });
    return;
  }

  lastFocus = document.activeElement;
  state.flyoutOpen = true;
  renderDetail(node);
  dom.flyScroll.scrollTop = 0;
  dom.scrim.hidden = false;
  dom.flyout.setAttribute('aria-hidden', 'false');
  gsap.killTweensOf([dom.scrim, dom.flyout]);
  gsap.set(dom.flyout, { visibility: 'visible' });
  gsap.to(dom.scrim, { opacity: 1, duration: reduceMotion ? 0 : 0.35 });
  gsap.to(dom.flyout, { xPercent: 0, duration: reduceMotion ? 0 : 0.6, ease: 'power4.out' });
  animateDetailIn(0.2);
  previewScreenshot();
  dom.flyClose.focus({ preventScroll: true });
}

function closeFlyout(animate = true) {
  if (!state.flyoutOpen) return;
  state.flyoutOpen = false;
  state.shotTween?.kill();
  dom.flyout.setAttribute('aria-hidden', 'true');
  const d = animate && !reduceMotion ? 1 : 0;
  gsap.to(dom.scrim, { opacity: 0, duration: 0.3 * d, onComplete: () => { dom.scrim.hidden = true; } });
  gsap.to(dom.flyout, {
    xPercent: 105, duration: 0.45 * d, ease: 'power3.in',
    onComplete: () => gsap.set(dom.flyout, { visibility: 'hidden' }),
  });
  const card = state.cards.get(state.activeId);
  setActive(null);
  updateHash(null);
  (card || lastFocus)?.focus?.({ preventScroll: true });
}

dom.flyClose.addEventListener('click', () => closeFlyout());
dom.scrim.addEventListener('click', () => closeFlyout());

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.flyoutOpen) closeFlyout();
    else stopTour();
  }
  if (!state.flyoutOpen) return;
  if (e.key === 'Tab') trapFocus(e);
  if (e.target.closest?.('.shot__frame')) return;
  if (e.key === 'ArrowRight' && !dom.flyNext.disabled) dom.flyNext.click();
  if (e.key === 'ArrowLeft' && !dom.flyPrev.disabled) dom.flyPrev.click();
});

function trapFocus(e) {
  const focusables = [...dom.flyout.querySelectorAll('button:not(:disabled), [tabindex="0"]')];
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ------------------------------------------------------------------ */
/* Coming soon                                                         */
/* ------------------------------------------------------------------ */

let comingSoonTl = null;

function showComingSoon(journey) {
  dom.comingSoonName.textContent = journey.name;
  dom.comingSoon.hidden = false;
  dom.canvas.classList.add('is-hidden');
  dom.legend.classList.add('is-hidden');
  dom.controls.classList.add('is-hidden');
  if (reduceMotion) return;
  const path = dom.comingSoon.querySelector('.cs-path');
  const dot = dom.comingSoon.querySelector('.cs-dot');
  comingSoonTl?.kill();
  comingSoonTl = gsap.timeline();
  comingSoonTl
    .from(dom.comingSoon.querySelectorAll('.cs-node'), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, stagger: 0.15, ease: 'back.out(2)' })
    .from(dom.comingSoon.querySelectorAll('p, h2'), { opacity: 0, y: 14, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, 0.2)
    .to(path, { strokeDashoffset: -24, duration: 1.2, ease: 'none', repeat: -1 }, 0)
    .to(dot, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 3, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.4 }, 0.3);
}

function hideComingSoon() {
  comingSoonTl?.kill();
  comingSoonTl = null;
  dom.comingSoon.hidden = true;
  dom.canvas.classList.remove('is-hidden');
  dom.legend.classList.remove('is-hidden');
  dom.controls.classList.remove('is-hidden');
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

function routeFromHash() {
  const [jid, nid] = location.hash.replace(/^#/, '').split('/');
  return { jid: journeys.some((j) => j.id === jid) ? jid : journeys[0].id, nid: nid || null };
}

window.addEventListener('hashchange', () => {
  const { jid, nid } = routeFromHash();
  if (jid !== state.journey?.id) selectJourney(jid, { openNode: nid });
  else if (nid && nid !== state.activeId) {
    const node = state.journey.nodes?.find((n) => n.id === nid);
    if (node) openFlyout(node);
  } else if (!nid && state.flyoutOpen) closeFlyout();
});

const { jid, nid } = routeFromHash();
if (!reduceMotion) {
  gsap.from('.topbar > *', { opacity: 0, y: -12, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
  gsap.from('.tab', { opacity: 0, y: 8, duration: 0.5, stagger: 0.06, delay: 0.15, ease: 'power3.out' });
}
selectJourney(jid, { openNode: nid });
document.fonts?.ready.then(() => moveIndicator(false));

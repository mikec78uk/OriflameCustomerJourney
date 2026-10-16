// Google Analytics page metrics by reference number, from "Some stats.xlsx".
// Changes (…Change) are fractions vs the previous period (e.g. 1.142 = +114.2%); null = not available.
// Update this file when a new export is supplied.

// Page-level GA data (users on cards, Key Behaviour in the flyout) is hidden for now; set to true to show it again.
export const SHOW_STATS = false;

export const STATS_PERIOD = { source: 'Google Analytics', dateRange: '30 Sep 2025 - 30 Sep 2026', comparison: 'vs previous period' };

export const STATS = {
  'R-3': { users: 6612, usersChange: null, views: 7708, viewsChange: null, viewsPerSession: 1.01, viewsPerSessionChange: null, viewsPerUser: 1.19, viewsPerUserChange: null, engagementRate: 0.6058, engagementRateChange: null },
  'R-5': { users: 19214, usersChange: null, views: 22682, viewsChange: null, viewsPerSession: 0.98, viewsPerSessionChange: null, viewsPerUser: 1.21, viewsPerUserChange: null, engagementRate: 0.6691, engagementRateChange: null },
  'R-10': { users: 10425, usersChange: null, views: 13466, viewsChange: null, viewsPerSession: 1.04, viewsPerSessionChange: null, viewsPerUser: 1.32, viewsPerUserChange: null, engagementRate: 0.6931, engagementRateChange: null },
  'R-13': { users: 8099, usersChange: 1.142, views: 9720, viewsChange: 1.448, viewsPerSession: 1.13, viewsPerSessionChange: 0.118, viewsPerUser: 1.2, viewsPerUserChange: 0.144, engagementRate: 0.9897, engagementRateChange: -0.005 },
  'R-21': { users: 1074, usersChange: 6.563, views: 536, viewsChange: 5.7, viewsPerSession: 0.46, viewsPerSessionChange: -0.189, viewsPerUser: 0.5, viewsPerUserChange: -0.114, engagementRate: 0.9829, engagementRateChange: -0.017 },
  'R-27': { users: 3261, usersChange: 4.372, views: 4269, viewsChange: 4.61, viewsPerSession: 1.24, viewsPerSessionChange: 0.036, viewsPerUser: 1.31, viewsPerUserChange: 0.047, engagementRate: 0.9913, engagementRateChange: 0.007 },
  'R-29': { users: 3744, usersChange: 3.875, views: 5362, viewsChange: 4.049, viewsPerSession: 1.31, viewsPerSessionChange: -0.001, viewsPerUser: 1.43, viewsPerUserChange: 0.036, engagementRate: 0.8843, engagementRateChange: -0.044 },
  'O-2': { users: 168, usersChange: null, views: 100, viewsChange: null, viewsPerSession: 0.46, viewsPerSessionChange: null, viewsPerUser: 0.6, viewsPerUserChange: null, engagementRate: 0.8157, engagementRateChange: null },
  'O-4': { users: 30, usersChange: null, views: 20, viewsChange: null, viewsPerSession: 0.67, viewsPerSessionChange: null, viewsPerUser: 0.67, viewsPerUserChange: null, engagementRate: 1.0, engagementRateChange: null },
  'O-12': { users: 5242, usersChange: 4.455, views: 15164, viewsChange: 6.481, viewsPerSession: 1.05, viewsPerSessionChange: -0.048, viewsPerUser: 2.94, viewsPerUserChange: 0.392, engagementRate: 0.9168, engagementRateChange: -0.046 },
  'O-13': { users: 10, usersChange: null, views: 0, viewsChange: null, viewsPerSession: 0.0, viewsPerSessionChange: null, viewsPerUser: 0.0, viewsPerUserChange: null, engagementRate: 1.0, engagementRateChange: null },
  'O-15': { users: 20, usersChange: null, views: 0, viewsChange: null, viewsPerSession: 0.0, viewsPerSessionChange: null, viewsPerUser: 0.0, viewsPerUserChange: null, engagementRate: 1.0, engagementRateChange: null },
  'NL-5': { users: 2296, usersChange: 4.278, views: 2648, viewsChange: 5.018, viewsPerSession: 1.01, viewsPerSessionChange: 0.068, viewsPerUser: 1.26, viewsPerUserChange: 0.219, engagementRate: 0.1767, engagementRateChange: -0.321 },
};

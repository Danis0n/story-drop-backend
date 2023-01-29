export const PORT = () => ({
  PORT: parseInt(process.env.PORT) || 3000,
});

export const FRONTEND_URL = () => ({
  URL: String(process.env.FRONTEND_URL),
});

export const COOKIE_MAX_AGE = 15 * 24 * 60 * 60 * 1000;
export const COOKIE_DEVICE = 'device_id';
export const COOKIE_LOGGED_IN = 'logged_in';

export const PORT = () => ({
  PORT: parseInt(process.env.PORT) || 3000,
});

export const FRONTEND_URL = () => ({
  URL: String(process.env.FRONTEND_URL),
});

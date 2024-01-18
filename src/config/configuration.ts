export default () => ({
  APP_URL: process.env.APP_URL,
  APP_PORT: parseInt(process.env.PORT, 10) || 3000,
  APP_ORIGIN: process.env.APP_ORIGIN,
});

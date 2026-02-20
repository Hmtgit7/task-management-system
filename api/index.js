// Vercel serverless entry point.
// After `tsc && tsc-alias` builds the backend to backend/dist/,
// this file re-exports the Express app so Vercel can wrap it as a
// serverless function.
const { app } = require("./backend/dist/app");

module.exports = app;

// Vercel serverless entry point.
// After `npm run build` (tsc + tsc-alias) compiles src/ -> dist/,
// this file exports the Express app so Vercel can wrap it as a serverless function.
const { app } = require("../dist/app");

module.exports = app;

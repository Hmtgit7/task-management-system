// Vercel serverless entry point.
// Imports from pre-compiled dist/ — path aliases are already
// resolved by tsc-alias during the build step, so plain Node.js
// require() works without any runtime alias registration.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app } = require('../dist/app');
module.exports = app;

module.exports = {
    // ... other configurations ...
    use: {
      // Configure Playwright to use Babel
      babel: {
        // Tell Playwright to transpile .ts, .tsx, .js, .jsx files
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  };
  
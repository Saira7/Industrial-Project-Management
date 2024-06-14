//npm install stream-http https-browserify util browserify-zlib stream-browserify assert url
// webpack.config.js
const path = require('path');

module.exports = {
    target: 'web',
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/")
    }
  }
};

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = function override(config, env) {
  config.plugins.push(new NodePolyfillPlugin());
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert/'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    url: require.resolve('url/'),
    process: require.resolve('process/browser')
  };
  console.log(config);
  
  return config;
};

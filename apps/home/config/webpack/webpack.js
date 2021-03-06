const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('../../../../package.json');

module.exports = (config, context) => {
  config.context = process.cwd();
  config.devServer = {
    ...config.devServer,
    port: 4100
  },
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      exposes: {
        './Home': 'apps/home/src/home-entry.tsx',
      },
      shared: {
        ...dependencies,
      }
    })
  );
  config.output.publicPath = 'http://localhost:4100/';

  return config;
};
const path = require('path');
const { merge } = require('webpack-merge');
module.exports = function(config) {
  config = merge(config, {
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        // for accessing static folder from inside stylesheets
        static: path.resolve(__dirname, 'static')
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /node_modules/,
          use: ['react-hot-loader/webpack']
        }
      ]
    }
  });

  return config;
};

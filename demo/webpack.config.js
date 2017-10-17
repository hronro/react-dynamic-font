const path = require('path');
const { writeFileSync } = require('fs');
const webpack = require('webpack');
const babel = require('babel-core');

writeFileSync(
  path.resolve(__dirname, 'src/external-helpers.js'),
  babel.buildExternalHelpers(),
);

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    path.resolve(__dirname, 'src/external-helpers.js'),
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
};

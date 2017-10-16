/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
/* eslint-enable import/no-extraneous-dependencies */
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  staticOptions: {
    index: '/demo/index.html',
  },
  hot: true,
  historyApiFallback: true,
}).listen(3000, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  // eslint-disable-next-line no-console
  console.log('Listening at http://localhost:3000/');
});

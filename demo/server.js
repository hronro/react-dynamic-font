var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  staticOptions: {
    index: '/demo/index.html',
  },
  hot: true,
  historyApiFallback: true
}).listen(3000, err => {
  if(err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});

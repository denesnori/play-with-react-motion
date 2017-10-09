'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';


// require('babel/polyfill');

var webpack = require('webpack');
var path = require('path');

var loaders = ['babel-loader'];
var port = process.env.PORT || 4040;

var devtool;
var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];
var entries = {
  '01-carousel': './examples/01-carousel/index.js',
  '02-carousel-in-modal': './examples/02-carousel-in-modal/index.js',
  '03-carousel-in-modal-2': './examples/03-carousel-in-modal-2/index.js',
  '04-carousel-in-modal-3': './examples/04-carousel-in-modal-3/index.js',
  '05-carousel-in-modal-4': './examples/05-carousel-in-modal-4/index.js',
  '06-circular-animation': './examples/06-circular-animation/index.js',
}

if (process.env.NODE_ENV === 'development') {
  devtool ='eval-source-map';
  loaders = ['react-hot-loader/webpack'].concat(loaders);
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    // 'react-hot-loader/babel'
  ]);
  entries = Object.keys(entries).reduce(function (result, key) {
    result[key] = [
      'webpack-dev-server/client?http://0.0.0.0:' + port,
      'webpack/hot/only-dev-server',
      entries[key]
    ];
    return result;
  }, {});
} else {
  devtool ='source-map';
  plugins = plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin()
  ]);
}

module.exports = {
  entry: entries, //single file / array of files that we want to run
  output: {
    filename: '[name]/all.js',
    publicPath: '/examples/',
    path: __dirname + '/examples/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /build|lib|node_modules/,
        loaders: loaders,

      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      }
    ],
    noParse: [
      path.join(__dirname,'node_modules','babel-core')
    ],
  },

  resolve: {
    extensions: ['.js','.jsx']
  },
  plugins: plugins,
}

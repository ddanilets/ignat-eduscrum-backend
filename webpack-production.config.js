/* eslint-disable prefer-template*/
const webpack = require('webpack');
const path = require('path');

const webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  entry: {
    app: [
      './client.js',
    ],
    vendor: [
      'react',
      'redux',
      'react-router',
    ],
  },
  output: {
    path: path.resolve('./build/js'),
    publicPath: '/public/js/',
    filename: 'main.min.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'url-loader' },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },
    ],
  },
  node: {
    setImmediate: false,
    console: true,
    fs: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].bundle.js',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};

module.exports = webpackConfig;

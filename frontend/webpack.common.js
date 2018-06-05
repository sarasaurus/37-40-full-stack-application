'use strict';

require('dotenv').config();

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const production = process.env.NODE_ENV === 'production'; // evals to a boolean
const webpackConfig = module.exports = {};

// one entry point
webpackConfig.entry = `${__dirname}/src/main.js`;

// one output point
webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL, // this is creating a fallback path if no can find it may be smart enough to go to / route anyway-- judy not sure tho, both [hash] and [name] and keywords/functions in webpack, triggering webpack magic
};

// to write the html
webpackConfig.plugins = [
  new HTMLWebpackPlugin({
    title: 'ASYNC Code Demo', // title is not required, its optional 
  }),
  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL),
  }),
  new MiniCssPlugin({
    filename: '[name].[hash].css',
  }),
];

webpackConfig.module = {};
const finalLoader = production ? MiniCssPlugin.loader : 'style-loader';

// we use an array in the use property because we don't need addtional configuartions-- if needed more would need to first create an object-- many different ways to do webpack config, this is just our version
webpackConfig.module.rules = [
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
    test: /\.js$/, // this is a regex expression that tells babel what to search for
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader', // this is transpiling
      options: {
        presets: ['env', 'stage-0', 'react'], // presets are a collection of plugins
        plugins: ['transform-react-jsx-source'], // plugins are ONE individual thing
        cacheDirectory: true, // cache directory means no need reload everything, just things that have changed
      },
    },
  },
  {// mini css plugin turns our styles into a single style sheet that we can link to-- previously we were just injecting styles into each html tag-- major no-no!
    test: /\.scss$/,
    use: [
      finalLoader,
      'css-loader',
      'sass-loader',
    ],
 
  },
];

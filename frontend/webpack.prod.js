// all the production rules
// much will need to be imported
const { NamedModulesPlugin } from 'webpack';
const CleanWebpackPlugin = ('')
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common');
const HtmlExcludeEmptyAssetsPlugin  =require('html-webpack-exclude-assets-plugin');



module.exports = merge(commonConfiguration, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCSSExxtractPlugin({
      filename: 'styles.[hash].css',
    }),
    new HtmlExcludeEmptyAssetsPlugin(),
      
  ],

  module:{
    rules: [
      {
        test: /\.sccs$/,
        use: [
          MiniCSSExxtractPlugin,
        ]
      }
    ]
  }
});
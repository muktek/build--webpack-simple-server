const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

let DEVTOOL
let PLUGIN_LIST = []

if (process.env.NODE_ENV === 'development'){
  DEVTOOL = 'inline-source-map'
  PLUGIN_LIST = [
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV ) }
    })
  ]
}


if(process.env.NODE_ENV === 'production'){
  DEVTOOL = 'source-map'
  PLUGIN_LIST = [
     //uglify js
     new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			output: {comments: false},
         sourceMap: true
	  }),

     //env plugin
	  new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV ) }
	  })
  ]
}


module.exports = {
  devtool : DEVTOOL,
  entry:   { filename: './src/index.js' },
  output : { filename: './js/bundle.js', path: `${__dirname}/dist/` },
  context : `${__dirname}` ,
  module: {
    loaders: [
		 {
          test: /\.js$/,
			 exclude: /node_modules/,
			 loader: 'babel-loader',
          query: {
             presets: ['es2015']
          }
		 }
	 ]
  },
  plugins: PLUGIN_LIST
}

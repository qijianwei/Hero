const path = require('path');
/* const HtmlWebpackPlugin = require('html-webpack-plugin'); */
/* const CleanWebpackPlugin = require('clean-webpack-plugin'); */
const webpack = require('webpack');
module.exports = {
  mode:"production",
  entry: './src/Main.js',
  devServer:{
      contentBase:'./bin',
      proxy: {
          '/ServiceCore/*':{
            target:"https://juedi001test.goxiaochengxu.cn/",
            secure: false,
            changeOrigin: true,
            }
      },
     /*  hot:true */
  },
   plugins: [
  /*   new CleanWebpackPlugin(['./bin/js']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }), */
   /*  new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin() */
  ], 
  output: {
    path: path.resolve(__dirname, './bin/js'),
    filename: 'bundle.js'
  }
};
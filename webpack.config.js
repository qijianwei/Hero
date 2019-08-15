/* 个人理解：
 1.在浏览器跑得微信小游戏，用webpack管理时 配置开发模式
 2.打包到微信ide里面跑的，用webpack管理时 配置生产模式
 3.npm是包管理工具，webpack是JS 代码模块化的打包工具
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const webpack = require('webpack');
module.exports = {
  mode:"development",//开发环境 默认代码不压缩  production:默认js代码压缩
  entry:'./src/Main.js',
 /*  entry: {
    app:'./src/Main.js',
  }, */
  devServer:{
      contentBase:'./bin',
    /*   proxy: {
          '/ServiceCore/*':{
            target:"https://juedi001test.goxiaochengxu.cn/",
            secure: false,
            changeOrigin: true,
            }
      }, */
       hot:true 
  },
   plugins: [
     /*  new CleanWebpackPlugin(),  */
     new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: './bin/index.html', // 配置文件模板
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin() 
  ], 
  output: {
    path: path.resolve(__dirname, './bin/js'),
    filename: 'bundle.js'
  }
};
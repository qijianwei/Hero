/* 个人理解：
 1.在浏览器跑得微信小游戏，用webpack管理时 配置开发模式
 2.打包到微信ide里面跑的，用webpack管理时 配置生产模式
 3.npm是包管理工具，webpack是JS 代码模块化的打包工具
*/

const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

// 复制插件
let copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: "production", //开发环境 默认代码不压缩  production:默认js代码压缩
  entry: './src/Main.js',
  output: {
    path: path.resolve(__dirname, './release/wxgame/js'),
    filename: 'bundle.js'
  },
  /*  devServer:{
       contentBase:'./bin',
        proxy: {
           '/ServiceCore/*':{
                          target:"https://juedi001test.goxiaochengxu.cn/",
                          secure: false,
                          changeOrigin: true,
                         }
       }, 
        hot:true 
   }, */
 /*  module: {
    rules: [{
      test: /\.(png|jpg)/,
      use: [{
        loader: 'url-loader',
        options: {
            name:'[name]-[chunkhash:8].[ext]',
            outputPath: 'image',
        }
      }]
    }]
  }, */
  //插件是从后往前执行
  plugins: [
    /*  new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: './bin/index.html', // 配置文件模板
      chunks:[], //要引入的js文件
    }), */
     new CleanWebpackPlugin({
      //代码未构建前删除，只删除一次，即使在watch模式下
      cleanOnceBeforeBuildPatterns: [
        path.join(process.cwd(), 'release/wxgame/scenes/*'),
        path.join(process.cwd(), 'release/wxgame/gamescenes/*')
      ],
      //每次代码构建好后删除指定目录  构建：build 查看命令行就知道
      cleanAfterEveryBuildPatterns:[
        path.join(process.cwd(), 'release/wxgame/spine/npc'),
        path.join(process.cwd(),'release/wxgame/font')
      ]
    }),   
    /* 拷贝文件 */
      new copyWebpackPlugin([{ 
      from: './bin/gamescenes',
      to: path.resolve(__dirname, './release/wxgame/gamescenes')
    },{
      from:'./bin/scenes',
      to:path.resolve(__dirname, './release/wxgame/scenes')
    }], {
      ignore: [
        '{project.swan.json,swan-game-adapter.js,version.js}',
      ],
       //在使用webpack --watch 或者webpack-dev-server 构建的时候，
       //默认只是复制修改的 文件。设置为 true的时候就复制所有的文件。 
     /*  copyUnmodified: true */ 
    }),
 
     
  
  ],

};
console.log(process.cwd());
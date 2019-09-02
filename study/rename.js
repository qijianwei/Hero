let fs = require('fs');
let pathFun=require('path');
let {
    promisify
} = require('util');
let stat = promisify(fs.stat);
let rename=promisify(fs.rename);
let readdir=promisify(fs.readdir);
let filePath = 'C:\\Users\\HI\\Desktop\\纯正商业级应用－Node.js Koa2开发微信小程序服务端\\';
let filePath2 = 'C:\\Users\\HI\\Desktop\\node基础视频\\';
let filePath3='I:\\前端技术提升\\React16.8+Next.js+Koa2开发Github全栈项目（完整版）\\';
/******************************** forEach问题了解清楚***************/
//https://imweb.io/topic/5b3b7d624d378e703a4f4437 (forEach)
(async function grabFile(path) {
    let files = await readdir(path);
    //可以用for of ,不能用foreach
    for(let i=0;i<files.length;i++){
        let file=files[i];
        try {
            let oldPath=pathFun.join(path,file);
            let newPath=pathFun.join(path,file.replace(/(【.*?】)|(\(.*?\))/, ''));
            let statResult = await stat(oldPath);
            if(oldPath!==newPath){
              await rename(oldPath,newPath);
            }
            if (statResult.isDirectory()) {
                grabFile(newPath);
             }
        } catch (err) {
            console.log(err);
        }
    }
    console.log('done........');
})(filePath3);


//以下都可以
/* "8-7 在小程序中携带令牌_batch[瑞客论坛 www.ruike1.com].mp4".match(/(\[.*?\])/)
"8-8 Sequelize模型的序列化_batch【瑞客论坛 www.ruike1.com】.mp4".replace(/(【.*?】)|(\(.*?\))/, '');
"8-8 Sequelize模型的序列化_batch【瑞客论坛 www.ruike1.com】.mp4".replace(/(【.*?】)/,''); */

/* 加油，干吧爹 */


/* 武林高高手项目：小游戏库做了横竖版适配库,统一的资源版本管理,为小游戏开发制定规范的开发流程和项目结构，加快了小游戏模块化的协作开发。
武林高高手游戏，完成游戏核心逻辑玩法，包括闯关模式，对战模式，新手引导奇遇等。英雄技能，兵器技能，机器人策略,游戏动效逻辑均已完成。 */

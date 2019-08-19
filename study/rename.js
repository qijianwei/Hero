let fs = require('fs');
let pathFun=require('path');
let {
    promisify
} = require('util');
let stat = promisify(fs.stat);
let rename=promisify(fs.rename);
let filePath = 'C:\\Users\\HI\\Desktop\\纯正商业级应用－Node.js Koa2开发微信小程序服务端\\';
let filePath2 = 'C:\\Users\\HI\\Desktop\\node基础视频\\';

/******************************** forEach问题了解清楚***************/
//https://imweb.io/topic/5b3b7d624d378e703a4f4437 (forEach)
(async function grabFile(path) {
    let files = await fs.readdir(path);
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
})(filePath2);


//以下都可以
/* "8-7 在小程序中携带令牌_batch[瑞客论坛 www.ruike1.com].mp4".match(/(\[.*?\])/)
"8-8 Sequelize模型的序列化_batch【瑞客论坛 www.ruike1.com】.mp4".replace(/(【.*?】)|(\(.*?\))/, '');
"8-8 Sequelize模型的序列化_batch【瑞客论坛 www.ruike1.com】.mp4".replace(/(【.*?】)/,''); */
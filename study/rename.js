let fs=require('fs');
let filePath='C:\\Users\\HI\\Desktop\\纯正商业级应用－Node.js Koa2开发微信小程序服务端\\';
function grab(path,cb){
    let files=fs.readdirSync(path);
    files.forEach((file)=>{
       if(fs.statSync(path+file).isFile()){
           cb(path,file);
       }
    })
}
function rename(oldPath,newPath){
    fs.rename(oldPath,newPath,(err)=>{
          if(err){
              throw err;
          }      
    })
};
grab(filePath,(path,fileName)=>{
   let oldPath=path+fileName,
       newPath=path+fileName.split('【')[0]+'.mp4';
    rename(oldPath,newPath);
})

//正则表达式 以=开头 以&结尾 取得的中间的内容
//(?<==).*?(?=(&|$))



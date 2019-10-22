//3行 221规律
var poolArr=[
    [1,2,3,4,5,6,7],
    [8,9,10,11,12,13,14],
    [15,16,17,18,19,20,21],
    [22,23,24,25,26,27,28],
    [29,30,31,32,33,34,35]
];
var deleteLineNum=[[1,2][randomIndex(2)]][0];
console.log(`删除行数：`,deleteLineNum)
var finallyArr=[];
var threeLine=[2,2,1];
function randomIndex(length){
    return Math.floor(Math.random() * length)
}
var poolIndex=0;
var deleteItem=null;
if(deleteItem==1){
    poolIndex=randomIndex(5);
    deleteItem=poolArr.splice(poolIndex,1);
    console.log('删除的item:',JSON.stringify(deleteItem));

    var firstIndex=randomIndex(4);
    finallyArr.push(poolArr[firstIndex].splice(randomIndex(7),1)[0]);
    finallyArr.push(poolArr[firstIndex].splice(randomIndex(6),1)[0]);
    poolArr.splice(firstIndex,1);
    
    var secondIndex=randomIndex(3);
    finallyArr.push(poolArr[secondIndex].splice(randomIndex(7),1)[0]);
    poolArr.splice(secondIndex,1);
    
    var thirdIndex=randomIndex(2);
    finallyArr.push(poolArr[thirdIndex].splice(randomIndex(7),1)[0]);
    poolArr.splice(thirdIndex,1);

    finallyArr.push(poolArr[0].splice(randomIndex(7),1)[0]);

}else{
    poolIndex=randomIndex(5);
    deleteItem=poolArr.splice(poolIndex,1);
    console.log('删除的item:',JSON.stringify(deleteItem));
    poolIndex=randomIndex(4);
    deleteItem=poolArr.splice(poolIndex,1);
    console.log('删除的item:',JSON.stringify(deleteItem));
    console.log(JSON.stringify(poolArr))
    
    /* var regular=threeLine[randomIndex(2)];
    console.log('分布规律：',regular); */
    var firstIndex=randomIndex(3);
    finallyArr.push(poolArr[firstIndex].splice(randomIndex(7),1)[0]);
    finallyArr.push(poolArr[firstIndex].splice(randomIndex(6),1)[0]);
    poolArr.splice(firstIndex,1);
    
    var secondIndex=randomIndex(2);
    finallyArr.push(poolArr[secondIndex].splice(randomIndex(7),1)[0]);
    finallyArr.push(poolArr[secondIndex].splice(randomIndex(6),1)[0]);
    poolArr.splice(secondIndex,1);
    
    finallyArr.push(poolArr[0].splice(randomIndex(7),1)[0]);
   
}
finallyArr.sort((a,b)=>{
    return a-b;
})

var behindDeleteNum=Math.random()>0.5?1:0;
var behindArr=[[1,2,3,4,5,6,7],[8,9,10,11,12]]
if(behindDeleteNum==0){
    finallyArr.push(Math.floor(Math.random()*7+1))
    finallyArr.push(Math.floor(Math.random()*5+8))
}else{
    var random=Math.random()>0.5?1:0;
    finallyArr.push(behindArr[random].splice(randomIndex(behindArr[random].length),1)[0])
    finallyArr.push(behindArr[random].splice(randomIndex(behindArr[random].length),1)[0])
}
console.log('最终结果:',finallyArr)

var frontZone = new Map();
var behindZone = new Map();

function initProbability() {
    for (let i = 1; i <= 35; i++) {
        frontZone.set(i, 1);
    }
    for (let j = 1; j <= 12; j++) {
        behindZone.set(j, 1);
    }
}
initProbability();
var promiseDlt=new Promise(function (resolve, reject) {
    var http = new XMLHttpRequest();
    http.open("GET", "http://apis.juhe.cn/lottery/history?key=e0a95b3906ce0e3888d3aac2049a15bc&lottery_id=dlt&page_size=24&page=1");
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 1) {
            console.log('请求已经开始,还没send')
        }
        if (this.readyState == 4 && this.status == 200) {
            let tempArr=JSON.parse(this.responseText).result.lotteryResList;
          //  console.error('origin ARR:',JSON.parse(JSON.stringify(tempArr)))
            let newArr=[];
            for(let i=0;i<8;i++){
                let random=Math.floor(Math.random()*(tempArr.length-1));
               // console.error('random:',random)
                newArr.push(JSON.parse(JSON.stringify(tempArr[random])))
                tempArr.splice(random, 1);
            }
           // console.error(newArr);
            resolve(newArr);
        }
    }
}) 
var  promiseSsq=new Promise(function (resolve, reject) {
    var http = new XMLHttpRequest();
    http.open("GET", "http://apis.juhe.cn/lottery/history?key=e0a95b3906ce0e3888d3aac2049a15bc&lottery_id=ssq&page_size=24&page=1");
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 1) {
            console.log('请求已经开始,还没send')
        }
        if (this.readyState == 4 && this.status == 200) {
            let tempArr=JSON.parse(this.responseText).result.lotteryResList;
          //  console.error('origin ARR:',JSON.parse(JSON.stringify(tempArr)))
            let newArr=[];
            for(let i=0;i<8;i++){
                let random=Math.floor(Math.random()*(tempArr.length-1));
               // console.error('random:',random)
                newArr.push(JSON.parse(JSON.stringify(tempArr[random])))
                tempArr.splice(random, 1);
            }
           // console.error(newArr);
            resolve(newArr);
        }
    }
}) 
promiseDlt.then((res)=>{
    console.error('请求大乐透成功')
    lottoResponse(res)
},(res)=>{
   console.error('请求失败',res);
})
Promise.all([promiseDlt,promiseSsq]).then((value)=>{
    console.log('Dlt and Ssq:')
    console.log(value)
})


/* "lotteryResList": [
    {
        "lottery_id": "dlt",
        "lottery_res": "17,24,26,28,32,07,09",
        "lottery_no": "19083",
        "lottery_date": "2019-07-20",
        "lottery_exdate": "2019-09-17",
        "lottery_sale_amount": "2.92亿",
        "lottery_pool_amount": "40.96亿"
    },
    {
        "lottery_id": "dlt",
        "lottery_res": "06,18,20,21,31,03,04",
        "lottery_no": "19082",
        "lottery_date": "2019-07-17",
        "lottery_exdate": "2019-09-14",
        "lottery_sale_amount": "2.71亿",
        "lottery_pool_amount": "41.17亿"
    }] */
function lottoResponse(lotteryResList) {
    let res = lotteryResList;
    let resultFrontArr = [];
    let resultBehindArr = [];
    for (var i = 0; i < res.length; i++) {
        let oneLotto = res[i].lottery_res.split(',').map(Number);
        for (var j = 0; j < oneLotto.length; j++) {
            if (j < 5) {
                frontZone.set(oneLotto[j], frontZone.get(oneLotto[j]) + 1);
            } else {
                if (i < 6) {
                    behindZone.set(oneLotto[j], frontZone.get(oneLotto[j]) + 1)
                }
            }
        }

    }
    for (var k = 0; k < 5; k++) {
        if (k < 2) {
            resultBehindArr.push(getRandomBehind())
        }
        resultFrontArr.push(getRandomFront());
    }
    console.error('前后区都算法:', resultFrontArr.concat(resultBehindArr).join('-'));
    let blueNumbers = [Math.floor(Math.random() * 11 + 1), Math.floor(Math.random() * 11 + 1)]
    console.error('后区随机:', resultFrontArr.concat(blueNumbers).join('-'));
}

function getRandomFront() {
    var total = 0;
    var result = 0;
    let tempMap = new Map();
    frontZone.forEach((value, key) => {
        //  console.log(key,value)
        tempMap.set(key, value + total);
        total += value
    })
    var rondom = Math.floor(Math.random() * (total - 1) + 1);
    tempMap.forEach((value, key) => {
        if (!result) {
            if (rondom <= value) {
                result = key;
                //break;
            }
        }

    })
    frontZone.delete(result);
    return result;
}

function getRandomBehind() {
    let total = 0;
    let result = 0;
    let tempMap = new Map();
    behindZone.forEach((value, key) => {
        // console.log(key,value)
        tempMap.set(key, value + total);
        total += value
    })
    let rondom = Math.floor(Math.random() * (total - 1) + 1);
    tempMap.forEach((value, key) => {
        if (!result) {
            if (rondom <= value) {
                result = key; //break;
            }
        }

    })
    behindZone.delete(result);
    return result;
}
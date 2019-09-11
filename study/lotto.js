var frontZone = new Map();
var behindZone = new Map();
var noteTimes = new Map();
var pageSize=24;
var selectedItem=6;
(function () {
    for (let i = 1; i <= 35; i++) {
        frontZone.set(i, 1);
    }
    for (let j = 1; j <= 12; j++) {
        behindZone.set(j, 1);
    }
    for (let k = 1; k <= 10; k++) {
        noteTimes.set(k, 11 - k);
    }
})();
//initProbability();
var promiseDlt = new Promise(function (resolve, reject) {
    var http = new XMLHttpRequest();
    http.open("GET", `http://apis.juhe.cn/lottery/history?key=e0a95b3906ce0e3888d3aac2049a15bc&lottery_id=dlt&page_size=${pageSize}&page=1`);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 1) {
            console.log('请求已经开始,还没send')
        }
        if (this.readyState == 4 && this.status == 200) {
            let tempArr = JSON.parse(this.responseText).result.lotteryResList;
            //  console.error('origin ARR:',JSON.parse(JSON.stringify(tempArr)))
            let newArr = [];
            for (let i = 0; i < selectedItem; i++) {
                let random = Math.round(Math.random() * (tempArr.length - 1));
                // console.error('random:',random)
                newArr.push(JSON.parse(JSON.stringify(tempArr[random])))
                tempArr.splice(random, 1);
            }
            // console.error(newArr);
            resolve(newArr);
        }
    }
})
var promiseSsq = new Promise(function (resolve, reject) {
    var http = new XMLHttpRequest();
    http.open("GET", `http://apis.juhe.cn/lottery/history?key=e0a95b3906ce0e3888d3aac2049a15bc&lottery_id=ssq&page_size=${pageSize}&page=1`);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 1) {
            console.log('请求已经开始,还没send')
        }
        if (this.readyState == 4 && this.status == 200) {
            let tempArr = JSON.parse(this.responseText).result.lotteryResList;
            //  console.error('origin ARR:',JSON.parse(JSON.stringify(tempArr)))
            let newArr = [];
            for (let i = 0; i < selectedItem; i++) {
                let random = Math.floor(Math.random() * (tempArr.length - 1));
                // console.error('random:',random)
                newArr.push(JSON.parse(JSON.stringify(tempArr[random])))
                tempArr.splice(random, 1);
            }
            // console.error(newArr);
            resolve(newArr);
        }
    }
})
promiseDlt.then((res) => {
    console.error('请求成功')
    // lottoResponse(res)
}, (res) => {
    console.error('请求失败', res);
})
Promise.all([promiseDlt, promiseSsq]).then((value) => {
    console.log('Dlt and Ssq:')
    console.log(value)
    lottoResponse(value[0].concat(value[1]));
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
    resultFrontArr = [];
    resultBehindArr = [];
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
    resultFrontArr = [];
    resultBehindArr = [];
    for (var k = 0; k < 5; k++) {
        if (k < 2) {
            resultBehindArr.push(getRandomBehind())
        }
        resultFrontArr.push(getRandomFront());
    }
    console.error('前区杀号:', resultFrontArr.concat(resultBehindArr).join('-'));
    let blueNumbers = [Math.floor(Math.random() * 11 + 1), Math.floor(Math.random() * 11 + 1)]
    console.error('随机:', resultFrontArr.concat(blueNumbers).join('-'));
    //上面选出的号当成杀号，将选出的号概率改为1(注释：选出的号已经删除)

    //重新洗一遍数据
    resultFrontArr = [];
    resultBehindArr = [];
    for (var k = 0; k < 5; k++) {
        if (k < 2) {
            resultBehindArr.push(getRandomBehind())
        }
        resultFrontArr.push(getRandomFront());
    }
    console.error('前区杀号后:', resultFrontArr.concat(resultBehindArr).join('-'));

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

(function getNotes() {
    let total = 0;
    let result = 0;
    let tempMap = new Map();
    noteTimes.forEach((value, key) => {
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
    console.log('double...............:', result);
    return result;
})();


/* Promise.all的运用 */
function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function timeoutPromise(promise, ms) {
    var timeout = delayPromise(ms).then(function () {
        throw new Error('Operation timed out after ' + ms + ' ms');
    });
    return Promise.race([promise, timeout]);
}
// 运行示例
var taskPromise = new Promise(function (resolve) {
    // 随便一些什么处理
    var delay = Math.random() * 2000;
    setTimeout(function () {
        resolve(delay + "ms");
    }, delay);
});
timeoutPromise(taskPromise, 1000).then(function (value) {
    console.log("taskPromise在规定时间内结束 : " + value);
}).catch(function (error) {
    console.log("发生超时", error);
});




/* 扩展知识：定制Error对象
Error 对象是ECMAScript的内建（build in）对象。

但是由于stack trace等原因我们不能完美的创建一个继承自 Error 的类，不过在这里我们的目的只是为了和Error有所区别，我们将创建一个 TimeoutError 类来实现我们的目的。

在ECMAScript6中可以使用 class 语法来定义类之间的继承关系。 */

class MyError extends Error {
    // 继承了Error类的对象
}
/* 为了让我们的 TimeoutError 能支持类似 error instanceof TimeoutError 的使用方法，我们还需要进行如下工作。 */

//TimeoutError.js
function copyOwnFrom(target, source) {
    Object.getOwnPropertyNames(source).forEach(function (propName) {
        Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
    });
    return target;
}

function TimeoutError() {
    var superInstance = Error.apply(null, arguments);
    copyOwnFrom(this, superInstance);
}
TimeoutError.prototype = Object.create(Error.prototype);
TimeoutError.prototype.constructor = TimeoutError;
/*  我们定义了 TimeoutError 类和构造函数，这个类继承了Error的prototype。
 
 它的使用方法和普通的 Error 对象一样，使用 throw 语句即可，如下所示。
  */
var promise = new Promise(function () {
    throw TimeoutError("timeout");
});
promise.catch(function (error) {
    console.log(error instanceof TimeoutError);
});
/* 有了这个 TimeoutError 对象，我们就能很容易区分捕获的到底
是因为超时而导致的错误，还是其他原因导致的Error对象了。 */
function throttle(fn, interval) {
    // last为上一次触发回调的时间
    let last = 0
    
    // 将throttle处理结果当作函数返回
    return function () {
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments
        // 记录本次触发回调的时间
        let now = +new Date()
        
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last >= interval) {
        // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
            last = now;
            fn.apply(context,args);
        }
      }
  }
  
  // 用throttle来包装scroll的回调
  const better_scroll = throttle(() => {console.log(this);console.log('触发了滚动事件')}, 1000)
  
  document.addEventListener('scroll', better_scroll)



  /* 防抖 */
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
    // 定时器
    let timer = null
    
    // 将debounce处理结果当作函数返回
    return function () {
      // 保留调用时的this上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
  
      // 每次事件被触发时，都去清除之前的旧定时器
      if(timer) {
          clearTimeout(timer)
      }
      // 设立新定时器
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
  
  // 用debounce来包装scroll的回调
  const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)
  
  document.addEventListener('scroll', better_scroll)
  

/*  加强版throttle*/

  // fn是我们需要包装的事件回调, delay是时间间隔的阈值
function throttle(fn, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0, timer = null
    // 将throttle处理结果当作函数返回
    
    return function () { 
      // 保留调用时的this上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
      // 记录本次触发回调的时间
      let now = +new Date()
      
      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
      if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
         clearTimeout(timer)
         timer = setTimeout(function () {
            last = now
            fn.apply(context, args)
          }, delay)
      } else {
          // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
          last = now
          fn.apply(context, args)
      }
    }
  }
  
  // 用新的throttle包装scroll的回调
  const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)
  
  document.addEventListener('scroll', better_scroll)

  
  
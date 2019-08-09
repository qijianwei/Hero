/* 
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>hash router</title>
</head>
<body>
  <ul>
    <li><a href="#/">/</a></li>
    <li><a href="#/page1">page1</a></li>
    <li><a href="#/page2">page2</a></li>
  </ul>
  <div class='content-div'></div>
  
  <button>back</button>
</body>
</html>
 */


class RouterClass {
    constructor() {
      debugger
      this.isBack = false
      this.routes = {}        // 记录路径标识符对应的cb
      this.currentUrl = ''    // 记录hash只为方便执行cb
      this.historyStack = []  // hash栈
      window.addEventListener('load', () => this.render())
      window.addEventListener('hashchange', () => this.render())
    }
    
    /**
     * 初始化
     */
    static init() {
      window.Router = new RouterClass()
    }
    
    /**
     * 记录path对应cb
     * @param path
     * @param cb 回调
     */
    route(path, cb) {
      this.routes[path] = cb || function() {}
    }
    
    /**
     * 入栈当前hash，执行cb
     */
    render() {
      if (this.isBack) {      // 如果是由backoff进入，则置false之后return
        this.isBack = false   // 其他操作在backoff方法中已经做了
        return
      }
      this.currentUrl = location.hash.slice(1) || '/'
      this.historyStack.push(this.currentUrl)
      this.routes[this.currentUrl]()
      // console.log('refresh事件   Stack：', this.historyStack, '   currentUrl:', this.currentUrl)
    }
    
    /**
     * 路由后退
     */
    back() {
      this.isBack = true
      this.historyStack.pop()                   // 移除当前hash，回退到上一个
      const { length } = this.historyStack
      if (!length) return
      let prev = this.historyStack[length - 1]  // 拿到要回退到的目标hash
      location.hash = `#${ prev }`
      this.currentUrl = prev
      this.routes[prev]()                       // 执行对应cb
      // console.log('点击后退，当前stack：', this.historyStack, '   currentUrl:', this.currentUrl)
    }
  }
  
  
  RouterClass.init()
  const BtnDom = document.querySelector('button')
  const ContentDom = document.querySelector('.content-div')
  const changeContent = content => ContentDom.innerHTML = content
  
  Router.route('/', () => changeContent('默认页面'))
  Router.route('/page1', () => changeContent('page1页面'))
  Router.route('/page2', () => changeContent('page2页面'))
  
  BtnDom.addEventListener('click', Router.back.bind(Router), false)
  
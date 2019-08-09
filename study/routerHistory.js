/* 
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>h5 router</title>
</head>
<body>
  <ul>
    <li><a href="/">/</a></li>
    <li><a href="/page1">page1</a></li>
    <li><a href="/page2">page2</a></li>
  </ul>
  <div class='content-div'></div>
  <script src='./router-history-test1.js'></script>
</body>
</html>
 */

class RouterClass {
    constructor(path) {
      this.routes = {}        // 记录路径标识符对应的cb
      history.replaceState({ path }, null, path)
      this.routes[path] && this.routes[path]()
      window.addEventListener('popstate', e => {
        console.log(e, ' --- e')
        const path = e.state && e.state.path
        this.routes[path] && this.routes[path]()
      })
    }
    
    /**
     * 初始化
     */
    static init() {
      window.Router = new RouterClass(location.pathname)
    }
    
    /**
     * 记录path对应cb
     * @param path 路径
     * @param cb 回调
     */
    route(path, cb) {
      this.routes[path] = cb || function() {}
    }
    
    /**
     * 触发路由对应回调
     * @param path
     */
    go(path) {
      history.pushState({ path }, null, path)
      this.routes[path] && this.routes[path]()
    }
  }
  
  
  RouterClass.init()
  const ul = document.querySelector('ul')
  const ContentDom = document.querySelector('.content-div')
  const changeContent = content => ContentDom.innerHTML = content
  
  Router.route('/', () => changeContent('默认页面'))
  Router.route('/page1', () => changeContent('page1页面'))
  Router.route('/page2', () => changeContent('page2页面'))
  
  ul.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault()
      Router.go(e.target.getAttribute('href'))
    }
  })
  
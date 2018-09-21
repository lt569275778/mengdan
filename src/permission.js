import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { constantRouterMap, asyncRouterMap } from './router/index'
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

// const whiteList = ['/databoard'] // 不重定向白名单
// const registerRouteFresh = true
// const registerRouteFresh = true
// var _routes = JSON.parse(sessionStorage.getItem('menu'))
router.beforeEach((to, from, next) => {
  NProgress.start()
  //   if (sessionStorage.getItem('menu')) {
  if (sessionStorage.getItem('menu')) {
    var c = JSON.parse(sessionStorage.getItem('menu'))
    var lastUrl = getLastUrl(window.location.href, '/')
    if (c.path === lastUrl) { // 动态路由页面的刷新事件
      const newRoutes = constantRouterMap.concat(asyncRouterMap)
      localStorage.removeItem('menu')
      router.addRoutes(newRoutes)
      next({ ...to, replace: true })
    //   router.replace(c.path) // replace,保证浏览器回退的时候能直接返回到上个页面，不会叠加
    }
  }
  next()
  //   if (to.path === '/databoard') {
  //     next({ path: '/' })
  //     NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  //   } else {
  //     next()
  //   }

  NProgress.done()
})
var getLastUrl = (str, yourStr) => str.slice(str.lastIndexOf(yourStr))// 取到浏览器出现网址的最后"/"出现的后边的字符

// router.beforeEach((to, from, next) => {
//   // 部分代码

// })
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

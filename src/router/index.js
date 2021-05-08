import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Home from '@/views/Home'
import Login from "@/views/Login"
import NotFound from '@/views/ERROR/404'
import Intro from '@/views/Intro'
import api from '@/http/apis'
import store from "@/store";
import i18n from "@/i18n";
import {MENUROUTELOADED, SETIFRAMEURL, SETNAVTREE, SETPARAMS} from "@/store/mutation_types";
import menu from "@/store/modules/menu";
import {isURL} from "@/utils/validate";
import ar from "element-ui/src/locale/lang/ar";
import {getIFrameUrl, getIFramePath} from "@/utils/iframe";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: i18n.t("common.main"),
      // name:"首页",
      component: Home,
      children: [
        {
          path: '',
          name: '系统介绍',
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = Cookies.get('token')
  let username = sessionStorage.getItem('user')
  if (to.path === '/login') {
    if (token) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (!token) {
      next('/login')
    } else {
      addDynamicMenuAndRoutes(username, to, from)
      next()
    }
  }
})

router.$addRoutes = (params) => {
  router.matcher = new Router({mode: "history"}).matcher
  router.addRoutes(params)
}

function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit(SETIFRAMEURL, url)
      break
    }
  }
}

/**
 * 加载动态菜单和路由
 * @param userName 用户
 * @param to 目标地址
 * @param from 从哪里来的
 */
function addDynamicMenuAndRoutes(userName, to, from) {

  handleIFrameUrl(to.path)
  if (store.state.app.menuRouteLoaded) {
    console.log('动态路由和菜单已存在')
    return
  }

  api.menu.findNavTree()
    .then(res => {
      // 添加动态路由
      let dynamicRoutes = addDynamicRoutes(res.data)
      router.options.routes[0].children =
        router.options.routes[0].children.concat(dynamicRoutes)
      // router.options.routes.forEach(rou => router.$addRoute(rou))
      router.$addRoutes(router.options.routes)

      // 动态加载菜单
      store.commit(SETNAVTREE, res.data)
      // 保存加载状态
      store.commit(MENUROUTELOADED, true)
    }).then(res => {
      api.user.findPermissions({'name': userName}).then(res => {
        store.commit(SETPARAMS, res.data)
      })
    }).catch(err => {
    alert(err)
  })
}

/**
 * 添加动态（菜单）路由
 * @param menuList 菜单列表
 * @param routes 递归创建的动态（菜单）路由
 */
function addDynamicRoutes(menuList = [], routes = []) {
  let temp = []

  for (let i = 0; i < menuList.length; ++i) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')

      //创建路由
      let route = {
        path: '/' + menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          id: menuList[i].id,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }

      // // url 以 http[s]://开头， 通过iframe展示
      // if (isURL(menuList[i].url)) {
      //   route['path'] = menuList[i].url
      //   route['name'] = menuList[i].name
      //   route['meta']['iframeUrl'] = menuList[i].url
      let path = getIFramePath(menuList[i].url)
      if (path) {
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = {'path':path, 'url':url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件必须按照url路径存储
          // 如 url = 'sys/user', 则组件路径应该是 '@/views/sys/user.vue'
          let array = menuList[i].url.split('/')
          let url = array[0].substring(0, 1).toUpperCase() + array[0].substring(1) + '/' +
            array[1].substring(0, 1).toUpperCase() + array[1].substring(1)
          route['component'] = resolve => require([`@/views/${url}`], resolve)
        } catch (e) {

        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log(routes)
  }
  return routes
}

export default router

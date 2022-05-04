import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _09b6133b = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _0a22a94a = () => interopDefault(import('..\\pages\\cards\\index.js' /* webpackChunkName: "pages/cards/index" */))
const _3819a34b = () => interopDefault(import('..\\pages\\help\\index.vue' /* webpackChunkName: "pages/help/index" */))
const _b6b72226 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _5154db15 = () => interopDefault(import('..\\pages\\movieRegister\\index.vue' /* webpackChunkName: "pages/movieRegister/index" */))
const _b10d7cae = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _37d563f8 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages/search/index" */))
const _89bb6ba8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _09b6133b,
    name: "about"
  }, {
    path: "/cards",
    component: _0a22a94a,
    name: "cards"
  }, {
    path: "/help",
    component: _3819a34b,
    name: "help"
  }, {
    path: "/home",
    component: _b6b72226,
    name: "home"
  }, {
    path: "/movieRegister",
    component: _5154db15,
    name: "movieRegister"
  }, {
    path: "/register",
    component: _b10d7cae,
    name: "register"
  }, {
    path: "/search",
    component: _37d563f8,
    name: "search"
  }, {
    path: "/",
    component: _89bb6ba8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

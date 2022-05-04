import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_f70f4e1a from 'nuxt_plugin_plugin_f70f4e1a' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_axios_094f6196 from 'nuxt_plugin_axios_094f6196' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_dialogplugin23c25746_dbcbb8ce from 'nuxt_plugin_dialogplugin23c25746_dbcbb8ce' // Source: .\\dialog.plugin.23c25746.js (mode: 'all')
import nuxt_plugin_fileuploadplugin3b96c0d2_5858d391 from 'nuxt_plugin_fileuploadplugin3b96c0d2_5858d391' // Source: .\\fileupload.plugin.3b96c0d2.js (mode: 'all')
import nuxt_plugin_dropdownplugin2a3124a6_a6c0b800 from 'nuxt_plugin_dropdownplugin2a3124a6_a6c0b800' // Source: .\\dropdown.plugin.2a3124a6.js (mode: 'all')
import nuxt_plugin_avatarplugin47c2772e_a3d22a52 from 'nuxt_plugin_avatarplugin47c2772e_a3d22a52' // Source: .\\avatar.plugin.47c2772e.js (mode: 'all')
import nuxt_plugin_sidebarplugin66753af7_406b74c6 from 'nuxt_plugin_sidebarplugin66753af7_406b74c6' // Source: .\\sidebar.plugin.66753af7.js (mode: 'all')
import nuxt_plugin_buttonplugina9d9bc72_77ed897a from 'nuxt_plugin_buttonplugina9d9bc72_77ed897a' // Source: .\\button.plugin.a9d9bc72.js (mode: 'all')
import nuxt_plugin_inputtextplugin7fb20ddc_bb0bf8d4 from 'nuxt_plugin_inputtextplugin7fb20ddc_bb0bf8d4' // Source: .\\inputtext.plugin.7fb20ddc.js (mode: 'all')
import nuxt_plugin_configpluginrippled7e9274c_6205e721 from 'nuxt_plugin_configpluginrippled7e9274c_6205e721' // Source: .\\config.plugin-ripple.d7e9274c.js (mode: 'all')
import nuxt_plugin_plugin_7a9948c5 from 'nuxt_plugin_plugin_7a9948c5' // Source: .\\auth\\plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"authNuxt","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""},{"name":"format-detection","content":"telephone=no"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"hid":"gf-prefetch","rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"hid":"gf-preconnect","rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":""},{"hid":"gf-preload","rel":"preload","as":"style","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Roboto&family=Varela+Round"}],"style":[],"script":[{"hid":"gf-script","innerHTML":"(function(){var l=document.createElement('link');l.rel=\"stylesheet\";l.href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Roboto&family=Varela+Round\";document.querySelector(\"head\").appendChild(l);})();"}],"noscript":[{"hid":"gf-noscript","innerHTML":"\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Roboto&family=Varela+Round\"\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gf-script":["innerHTML"],"gf-noscript":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_f70f4e1a === 'function') {
    await nuxt_plugin_plugin_f70f4e1a(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_094f6196 === 'function') {
    await nuxt_plugin_axios_094f6196(app.context, inject)
  }

  if (typeof nuxt_plugin_dialogplugin23c25746_dbcbb8ce === 'function') {
    await nuxt_plugin_dialogplugin23c25746_dbcbb8ce(app.context, inject)
  }

  if (typeof nuxt_plugin_fileuploadplugin3b96c0d2_5858d391 === 'function') {
    await nuxt_plugin_fileuploadplugin3b96c0d2_5858d391(app.context, inject)
  }

  if (typeof nuxt_plugin_dropdownplugin2a3124a6_a6c0b800 === 'function') {
    await nuxt_plugin_dropdownplugin2a3124a6_a6c0b800(app.context, inject)
  }

  if (typeof nuxt_plugin_avatarplugin47c2772e_a3d22a52 === 'function') {
    await nuxt_plugin_avatarplugin47c2772e_a3d22a52(app.context, inject)
  }

  if (typeof nuxt_plugin_sidebarplugin66753af7_406b74c6 === 'function') {
    await nuxt_plugin_sidebarplugin66753af7_406b74c6(app.context, inject)
  }

  if (typeof nuxt_plugin_buttonplugina9d9bc72_77ed897a === 'function') {
    await nuxt_plugin_buttonplugina9d9bc72_77ed897a(app.context, inject)
  }

  if (typeof nuxt_plugin_inputtextplugin7fb20ddc_bb0bf8d4 === 'function') {
    await nuxt_plugin_inputtextplugin7fb20ddc_bb0bf8d4(app.context, inject)
  }

  if (typeof nuxt_plugin_configpluginrippled7e9274c_6205e721 === 'function') {
    await nuxt_plugin_configpluginrippled7e9274c_6205e721(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_7a9948c5 === 'function') {
    await nuxt_plugin_plugin_7a9948c5(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }

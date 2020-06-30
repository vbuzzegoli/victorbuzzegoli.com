import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './services/firebase'
import SvgIcon from 'vue-svgicon'

Vue.config.productionTip = false

Vue.use(SvgIcon, { tagName: 'svgicon' })

firebase.initialize()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

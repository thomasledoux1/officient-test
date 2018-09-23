import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

import axios from 'axios'

Vue.use(BootstrapVue)

Vue.prototype.$http = axios

Vue.use(VueSocketIO, io('https://dejli-losowanko-backend.herokuapp.com'))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

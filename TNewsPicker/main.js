import Vue from 'vue'
import App from './App'
import api from './common/api.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

Vue.prototype.$api = api;
import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

import Message from 'element-ui'

Vue.use(Message)

new Vue({
  render: h => h(App),
}).$mount('#app')

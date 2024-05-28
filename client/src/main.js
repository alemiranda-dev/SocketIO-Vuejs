import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'

Vue.config.productionTip = false

// Configuração do Socket.IO
const socket = io('http://localhost:3000');
Vue.prototype.$socket = socket;

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')

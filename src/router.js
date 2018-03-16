import Vue from 'vue'
import Router from 'vue-router'
import Chat from './views/Chat.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'login',
          component: Login,
      },
      {
        path: '/chat/:id_room',
        name: 'chat',
        component: Chat,
      }
  ],
})

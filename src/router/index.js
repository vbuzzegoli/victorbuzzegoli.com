import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home'
    },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      title: 'Contact'
    },
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/post',
    name: 'Post',
    meta: {
      title: 'Post'
    },
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
  },
  {
    path: '*',
    meta: {
      title: 'Not Found'
    },
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `VBZ - ${to.meta.title}` : 'VBZ'
  store.dispatch('clearServiceLayerErrors')
  next()
})

router.afterEach((to, from) => {
  document.querySelector('#app>.main').scrollTop = 0
})

export default router

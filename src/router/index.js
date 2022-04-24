import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/reset',
    name: 'ReSetPassWord',
    component: () => import('@/views/ReSetPassWord.vue')
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/views/Center/Center.vue'),
    redirect: '/center/usercenter',
    meta: {
      needLogin: true
    },
    children: [
      {
        path: 'usercenter',
        name: 'UserCenter',
        component: () => import('@/views/Center/UserCenter.vue')
      },
      {
        path: 'base',
        name: 'Base',
        component: () => import('@/views/Center/Base.vue')
      },
      {
        path: 'mypost',
        name: 'MyPost',
        component: () => import('@/views/Center/MyPost.vue')
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/Center/Message.vue')
      }
    ]
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/Post/Post.vue')
  },
  {
    path: '/editpost/:id',
    props: true,
    name: 'EditPost',
    component: () => import('@/views/Post/EditPost.vue')
  },
  {
    path: '/postdetails/:id',
    name: 'PostDetails',
    props: true,
    component: () => import('@/views/Post/PostDetails.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    props: true,
    component: () => import('@/views/User.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})
router.beforeEach((to, from, next) => {
  const decoded = jwt.decode(store.state.token)
  if (to.matched.some(item => item.meta.needLogin)) {
    if (store.state.isLogin) {
      // 校验token是否过期
      if (!decoded || !dayjs().isBefore(dayjs(decoded.exp * 1000))) {
        next('/login')
        store.commit('SET_USERINFO', {})
        store.commit('SET_LOGIN', false)
        store.commit('SET_TOKEN', '')
      } else {
        next()
      }
    } else {
      next('/login')
      store.commit('SET_USERINFO', {})
      store.commit('SET_LOGIN', false)
      store.commit('SET_TOKEN', '')
    }
  } else {
    next()
  }
})
export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../components/Home.vue'
import Goods from '../components/Goods.vue'
import Menu from '../components/Menu.vue'
import Quanxian from '../components/QuanXian.vue'
import User from '../components/User.vue'
import Order from '../components/Order.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods
      },
      {
        path: '/menu',
        name: 'Menu',
        component: Menu
      },
      {
        path: '/quanxian',
        name: 'Quanxian',
        component: Quanxian
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
	base: '/ruandimall', // 基础路径
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next();
  }

  const token = window.sessionStorage.getItem('token');

  if (token) {
    return next();
  }

  next('/');
})


export default router

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
    component: Login,
    meta: {
      title: '欢迎使用'
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页'
        }
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods,
        meta:{
          title: '商品管理'
        }
      },
      {
        path: '/menu',
        name: 'Menu',
        component: Menu,
        meta:{
          title: '菜单管理'
        }
      },
      {
        path: '/quanxian',
        name: 'Quanxian',
        component: Quanxian,
        meta:{
          title: '权限管理'
        }
      },
      {
        path: '/user',
        name: 'User',
        component: User,
        meta:{
          title: '用户管理'
        }
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
        meta:{
          title: '订单管理'
        }
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

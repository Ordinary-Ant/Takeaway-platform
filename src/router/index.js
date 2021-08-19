/**
 * 路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
//  import MSite from '../pages/Msite/Msite.vue';
//  import Search from '../pages/Search/Search.vue';
//  import Order from '../pages/Order/Order.vue';
//  import Profile from '../pages/Profile/Profile.vue';
// 路由组件懒加载
const MSite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Login = () => import('../pages/Login/Login.vue')
const Shop = () => import('../pages/Shop/Shop.vue')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods.vue')
const ShopInfo = () => import('../pages/Shop/ShopInfo/ShopInfo.vue')
const ShopRatings = () => import('../pages/Shop/ShopRatings/ShopRatings.vue')
// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  // 所有路由
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {
        // 配置标识
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        // 配置标识
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        // 配置标识
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        // 配置标识
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})

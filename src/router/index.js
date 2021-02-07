/**
 * 路由器对象模块
 * 
 */

 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import MSite from '../pages/Msite/Msite.vue';
 import Search from '../pages/Search/Search.vue';
 import Order from '../pages/Order/Order.vue';
 import Profile from '../pages/Profile/Profile.vue';
 import Login from '../pages/Login/Login.vue';

 // 声明使用插件
 Vue.use(VueRouter);

 export default new VueRouter({
    // 所有路由
    routes:[
        {
            path:'/msite',
            component:MSite,
            meta:{
                // 配置标识
                showFooter:true
            }
        },
        {
            path:'/search',
            component:Search,
            meta:{
                // 配置标识
                showFooter:true
            }
        },
        {
            path:'/order',
            component:Order,
            meta:{
                // 配置标识
                showFooter:true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta:{
                // 配置标识
                showFooter:true
            }
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/',
            redirect:'/msite'
        }
    ]

 })
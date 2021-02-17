import Vue from 'vue';
import {Button} from 'mint-ui';
import App from './App.vue';
import router from './router/index.js';
// 图片懒加载
import VueLazyload from 'vue-lazyload';
import store from './store'
import './mock/mockServer';
import loading from './common/imgs/loading.gif';
import './filters'; //加载过滤器

// 注冊全局標簽，使用方式(<mt-button>)
Vue.component(Button.name,Button);

// 自定义指令为v-lazy
Vue.use(VueLazyload,{
    loading:loading
})

new Vue({
    el:'#app',
    render:h => h(App),
    router,
    store
})
// 直接更新state的多个方法的对象
import Vue from 'vue';
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,RECEIVE_USER_INFO, RESET_USER_INFO,RECEIVE_GOODS,RECEIVE_INFO,RECEIVE_RATINGS,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT, CLEAR_CART, RECEIVE_SEARCH_SHOPS} from './mutation-types';
export default {
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address;
    },
    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys = categorys;
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops;
    },
    [RECEIVE_USER_INFO](state,{userInfo}){
        state.userInfo = userInfo;
    },
    [RESET_USER_INFO](state){
        state.userInfo = {};
    },
    [RECEIVE_RATINGS](state,{ratings}){
        state.ratings = ratings;
    },
    [RECEIVE_GOODS](state,{goods}){
        state.goods = goods;
    },
    [RECEIVE_INFO](state,{info}){
        state.info = info;
    },
    [INCREMENT_FOOD_COUNT](state,{food}){
        if(!food.count){//一开始food里面是没有count属性的
            // food.count = 1; 注意：在vue中对象新增属性是没有数据绑定的
            // vue中提供了一个方法来对指定对象添加属性，这种添加方式可以进行数据绑定，Vue.set(对象,属性名,属性值)
            Vue.set(food,'count',1);

            // 将food添加到cartFoods中
            state.cartFoods.push(food)
        }else{
            food.count++;
        }
    },
    [DECREMENT_FOOD_COUNT](state,{food}){
        if(food.count){
            food.count--;
            if(food.count === 0){
                // 移除food
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },

    [CLEAR_CART](state){
        // 清空food中的count属性
        state.cartFoods.forEach(food=>{
            food.count = 0
        })
        // 移除购物车所有购物项
        state.cartFoods = [];
    },
    [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
        state.searchShops = searchShops;
    },
}
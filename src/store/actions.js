// 通过mutations间接更新state的多个方法的对象
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_GOODS,RECEIVE_INFO,RECEIVE_RATINGS,RECEIVE_SHOPS,RECEIVE_USER_INFO,RESET_USER_INFO,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,CLEAR_CART,RECEIVE_SEARCH_SHOPS} from './mutation-types';
import {reqAddress,reqFoodCategorys,reqShops, reqUserInfo,reqLogout,reqShopInfo,reqShopGoods,reqShopRatings,reqSearchShop} from '../api/index';
export default {
    // 异步获取地址
    async getAddress({commit,state}){
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqAddress(geohash);
        // 提交一个mutation
        if(result.code === 0){
            const address = result.data;
            commit(RECEIVE_ADDRESS,{address});
        }
    },
    
    // 异步获取食品分类
    async getCategorys({commit}){
        // 发送异步ajax请求
        const result = await reqFoodCategorys();
        // 提交一个mutation
        if(result.code === 0){
            const categorys = result.data;
            commit(RECEIVE_CATEGORYS,{categorys});
        }
    },

    // 异步获取商品
    async getShops({commit,state}){
        // 发送异步ajax请求
        const result = await reqShops(state.longitude,state.latitude);
        // 提交一个mutation
        if(result.code === 0){
            const shops = result.data;
            commit(RECEIVE_SHOPS,{shops});
        }
    },

    // 同步記錄個人信息
    recordUser({commit},userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    },

    // 異步獲取個人信息
    async getUserInfo({commit}){
        const result = await reqUserInfo();
        if(result.code === 0){
            const userInfo = result.data;
            commit(RECEIVE_USER_INFO,{userInfo});
        }
    },

    // 異步登出
    async logout({commit}){
        const result = await reqLogout();
        if(result.code === 0){
            commit(RESET_USER_INFO);
        }
    },

    // 異步獲取商家信息
    async getShopInfo({commit}){
        const result = await reqShopInfo();
        if(result.code === 0){
            const info = result.data
            commit(RECEIVE_INFO,{info});
        }
    },

    // 異步獲取商家評論列表
    async getShopRatings({commit},callback){
        const result = await reqShopRatings();
        if(result.code === 0){
            const ratings = result.data;
            commit(RECEIVE_RATINGS,{ratings});
            // 通知組件
            callback && callback();
        }
    },

    // 異步獲取商家商品列表
    async getShopGoods({commit},callback){
        const result = await reqShopGoods();
        if(result.code === 0){
            const goods = result.data;
            commit(RECEIVE_GOODS,{goods});
            // 通知組件
            callback && callback();
        }
    },

    // 同步更新food的count
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
            commit(INCREMENT_FOOD_COUNT,{food})
        }else{
            commit(DECREMENT_FOOD_COUNT,{food})
        }
    },

    // 同步清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    },

    // 异步获取搜索的商家数组
    async getSearchShops({commit,state},keyword){
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqSearchShop(geohash,keyword);
        if(result.code === 0){
            const searchShops = result.data;
            commit(RECEIVE_SEARCH_SHOPS,{searchShops});
        }
    },
}
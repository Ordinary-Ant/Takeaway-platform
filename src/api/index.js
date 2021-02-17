/**
 * 包含n个接口请求函数的模块
 * 返回值：promise对象
 **/ 


import ajax from './ajax';
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情(一个参数：经纬度)
export const reqAddress = (geohash)=>{
    return ajax(`${BASE_URL}/position/${geohash}`);
}

// 2、获取食品分类
export const reqFoodCategorys = ()=>{
    return ajax(`${BASE_URL}/index_category`);
}

// 3、根据经纬度获取商铺列表(两个参数：经度 纬度)
export const reqShops = (latitude,longitude)=>{
    return ajax(`${BASE_URL}/shops`,{latitude,longitude});
}

// 4、根据经纬度和关键字搜索商(两个参数：经纬度和关键字)
export const reqSearchShop = (geohash,keyword)=>{
    return ajax(`${BASE_URL}/search_shops`,{geohash,keyword});
}

// 5、获取一次性验证码
// export const reqCaptcha = ()=>{
//     return ajax(`${BASE_URL}/captcha`);
// }

// 6、用户名密码登陆(三个参数：用户名，密码，验证码)
export const reqPwdLogin = ({name,pwd,captcha})=>{
    return ajax(`${BASE_URL}/login_pwd`,{name,pwd,captcha},'POST');
}

// 7、发送短信验证码
export const reqSendCode = (phone)=>{
    return ajax(`${BASE_URL}/sendcode`,{phone});
}

// 8、手机号验证码登陆
export const reqSmsLogin = (phone,code)=>{
    return ajax(`${BASE_URL}/login_sms`,{phone,code},'POST');
}

// 9、根据会话获取用户信息
export const reqUserInfo = ()=>{
    return ajax(`${BASE_URL}/userinfo`);
}

// 10、用户登出
export const reqLogout = ()=>{
    return ajax(`${BASE_URL}/logout`);
}

// 獲取商家信息
export const reqShopInfo = ()=>{
    return ajax(`/info`);
}
// 獲取商家評價
export const reqShopRatings = ()=>{
    return ajax(`/ratings`);
}
// 獲取商家商品
export const reqShopGoods = ()=>{
    return ajax(`/goods`);
}
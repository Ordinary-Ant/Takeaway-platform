/**
 * 包含n个接口请求函数的模块
 * 返回值：promise对象
 **/ 

import ajax from './ajax';

// 1、根据经纬度获取位置详情(一个参数：经纬度)
export const reqAddress = (geohash)=>{
    ajax(`/position/${geohash}`);
}

// 2、获取食品分类
export const reqFoodTypes = ()=>{
    ajax(`/index_category`);
}

// 3、根据经纬度获取商铺列表(两个参数：经度 纬度)
export const reqShops = (latitude,longitude)=>{
    ajax(`/shops`,{latitude,longitude});
}

// 4、根据经纬度和关键字搜索商(两个参数：经纬度和关键字)
export const reqSearchShop = (geohash,keyword)=>{
    ajax(`/search_shops`,{geohash,keyword});
}

// 5、获取一次性验证码
export const reqCaptcha = ()=>{
    ajax(`/captcha`);
}

// 6、用户名密码登陆(三个参数：用户名，密码，验证码)
export const reqLoginByUser = ()=>{
    ajax(`/login_pwd`,{name,pwd,captcha},POST);
}
// 7、发送短信验证码
// 8、手机号验证码登陆
// 9、根据会话获取用户信息
// 10、用户登出

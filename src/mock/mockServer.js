// 使用mockjs提供mock數據接口

import Mock from 'mockjs';
import data from './data.json';


/**
 * Mock.mock( rurl, template )
 * 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
 */

// 返回goods接口
Mock.mock('/goods',{code:0,data:data.goods})
// 返回ratings接口
Mock.mock('/ratings',{code:0,data:data.ratings})
// 返回info接口
Mock.mock('/info',{code:0,data:data.info})

// 注意：此模塊無需暴露出去，只需要保證執行即可,即在入口js中將此模塊引入即可
/**
 * ajax请求函数模块
 * 返回值：promise对象(异步返回的数据是：response.data)
 * 
**/ 
import axios from 'axios';
export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject)=>{
        // 执行异步ajax请求 
        let promise
        if(type === 'GET'){
            let data = ''; //数据拼接字符串
            // 遍历请求参数
            Object.keys(params).forEach(key =>{
                data += key + '=' + data[key] + '&'
            })
            // 如果没有参数
            if(data !== ''){
                data = data.substring(0,data.lastIndexOf('&'));
                url = url + '?' + data;
            }
            // 发送get请求
            promise = axios.get(url);
        }else{
            // 发送post请求
            promise = axios.post(url,data);
        }
        promise
            // 成功后调用resolve
            .then((response)=>{
                resolve(response.data)
            }).
            // 失败后调用reject
            catch((error)=>{
                reject(error)
            })     
    })
}
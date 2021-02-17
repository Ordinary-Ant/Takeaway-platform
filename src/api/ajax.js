/**
 * ajax请求函数模块
 * 返回值：promise对象(异步返回的数据是：response.data)
 * 
**/ 
import axios from 'axios';
export default function ajax(url,data={},type='GET'){
    return new Promise(function(resolve,reject){
        // 执行异步ajax请求 
        let promise
        if(type === 'GET'){
            let newData = ''; //数据拼接字符串
            // 遍历请求参数
            Object.keys(data).forEach(key =>{
                newData += key + '=' + data[key] + '&';
            })
            // 如果没有参数
            if(newData !== ''){
                newData = newData.substring(0,newData.lastIndexOf('&'));
                url = url + '?' + newData;
            }
            // 发送get请求
            promise = axios.get(url);
        }else{
            // 发送post请求
            promise = axios.post(url,data);
        }
        promise
            // 成功后调用resolve
            .then(function(response){
                resolve(response.data)
            })
            // 失败后调用reject
            .catch(function(error){
                reject(error)
            })     
    })
}
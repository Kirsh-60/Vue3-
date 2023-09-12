/**
 @name: 示例
 @description: 示例请求api
 @author: tjp
 @time: 2023-9-12 15:53:56
 */
import http from "@/utils/request";

// GET
// 这里我用的any 不去考虑传入的参数类型，如果有要求，参考下面的指定类型，如果可以，希望能
// 把定义的接口数据类型单独放入一个文件，在这里引入即可，要不太乱了
export function getKoulingApi(data?:any) {
     return http.request({
         url: data,
         method: 'GET'
     })
 }

// POST
export function Login(data?:any) {
  return http.request({
    url: "user/login",
    method: "POST",
    data,
  });
}

export function userInfo(data?:any) {
  return http.request({
    url: "user/userInfo",
    method: "POST",
    data,
  });
}
export function updateUserMessage(data?:any) {
  return http.request({
    url: "user/updateUserMessage",
    method: "POST",
    data,
  });
}

// 指定类型
/*export function switchLanguage(data: types.languageTypes) {
     return http.request({
         url: '/api/common/language',
         method: 'POST',
         data
     })
 }*/

// 类型
/*interface userLoginTypes {
     address: string
     sign: string
     code?: string | boolean
 }
 interface languageTypes {
     language: string
 }
 export { userLoginTypes, languageTypes }*/

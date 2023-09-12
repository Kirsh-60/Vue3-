/**
 * @name: luch-request uni-app跨平台请求库
 * @description: https://www.quanzhan.co/luch-request/
 * @author: tjp
 * @time: 2022-10-09 15:57:24
 */
import {config} from './config'
import Request, {type HttpResponse,type HttpRequestConfig,type HttpError} from 'luch-request'
// 本地环境地址
const BASE_API = config.requestUrl
// 局域网环境地址
// const BASE_API = ''
// 线上地址
// const BASE_API = ''
 
const http = new Request({
    //设置请求的base url
    baseURL: BASE_API,
    //超时时长5分钟
    timeout: 300000,
    header: {
        'Content-Type': 'application/json',
        'x-token': uni.getStorageSync('x-token') ? uni.getStorageSync('x-token') : ''
    }
})
//请求拦截器
http.interceptors.request.use(
    (config: HttpRequestConfig) => {
        // 拦截添加token
        config.header = {
            'x-token': uni.getStorageSync('x-token') ? uni.getStorageSync('x-token') : ''
        }
        return config
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)
 
// 响应拦截器
http.interceptors.response.use(
    (response: HttpResponse) => {
        switch (response.config.method) {
            case 'GET':
                return formatData(response.data)
            case 'POST':
                // 登录接口保存token
                // ————————————————待修改—————————————————————
                // if (response.config.url === '/user/login') {
                //     uni.setStorageSync('x-token', response.data.data['x-token'])
                //     return formatData(response.data)
                // } else if (response.config.url === '/api/user_withdraw/apply') {
                //     return formatData(response)
                // }
                return formatData(response.data)
 
            default:
                return formatData(response.data)
        }
    },
    (error: HttpError) => {
        console.log('响应拦截器错误捕获', error)
        uni.showToast({
            title: '响应拦截器错误捕获',
            icon: 'none'
        })
        return Promise.resolve(error)
    }

)
 
function formatData(data: any) {
    switch (data.code) {
        case 200:
            return data.data
        case 400:
            uni.showToast({
                title: data.msg,
                icon: 'none'
            })
            return Promise.reject(data)
        case 401:
            uni.showToast({
                title: data.msg,
                icon: 'none'
            })
            return Promise.reject(data)
        case 405:
            // 一般是交易查询不到
            return Promise.reject(data)
        default:
            return data
    }
}
 
export default http
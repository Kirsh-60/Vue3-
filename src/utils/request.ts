/**
 * @name: luch-request uni-app跨平台请求库
 * @description: https://www.quanzhan.co/luch-request/
 * @author: tjp
 * @time: 2022-10-09 15:57:24
 */
import { config } from "./config";
import Request, {
  type HttpResponse,
  type HttpRequestConfig,
  type HttpError,
} from "luch-request";
// 本地环境地址
const BASE_API = config.requestUrl;
// 局域网环境地址
// const BASE_API = ''
// 线上地址
// const BASE_API = ''

const http = new Request();

http.setConfig((config) => {
  //设置请求的base url
  config.baseURL = BASE_API;
  //超时时长5分钟
  config.timeout = 300000;
  config.header = {
    "Content-Type": "application/json",
    "x-token": uni.getStorageSync("x-token")
      ? uni.getStorageSync("x-token")
      : "",
  };
  return config;
});
//请求拦截器
http.interceptors.request.use(
  (config: HttpRequestConfig | any) => {
    // 拦截添加token
    config.header = {
      "x-token": uni.getStorageSync("x-token")
        ? uni.getStorageSync("x-token")
        : "",
    };
    // 演示custom 用处
    if (config.custom.loading) {
      uni.showLoading({
        title: "加载中~",
      });
    }
    return config;
  },
  (error: any) => {
    return Promise.resolve(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: HttpResponse) => {
    if (response.config.custom) {
      uni.hideLoading();
    }
    return formatData(response.data);
  },
  (error: HttpError) => {
    if (error.config.custom) {
      uni.hideLoading();
    }
    uni.showToast({
      title: "响应拦截器错误捕获",
      icon: "none",
    });
    return Promise.resolve(error);
  }
);

function formatData(data: any) {
  switch (data.status) {
    case "ok":
      return data;
    default:
      return data;
  }
}

export default http;

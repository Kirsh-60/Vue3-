let isOnline = process.env.NODE_ENV === "development" ? false : true;
// 线上 配置
const configOnline = {
  requestUrl: "https://mapi.vjifen.com/vjifenInterface",
};
// 测试 配置
const configDev = {
  requestUrl: "https://hb06.csr03.cn/",
};
export const config = isOnline ? configOnline : configDev;

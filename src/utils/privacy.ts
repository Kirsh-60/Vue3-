export const PrivacyFun = () => {
  return new Promise((resolve, reject) => {
    if (wx.getPrivacySetting) {
      wx.getPrivacySetting({
        //查询隐私授权情况
        success(res: any) {
          console.log(res.needAuthorization, "用户没有进行微信授权");
          resolve(res);
        },
        fail(error: any) {
          reject(error);
        },
      });
    } else {
      console.log("低版本低版本低版本");
      resolve("isLowVersion");
    }
  });
};

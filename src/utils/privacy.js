export const PrivacyFun = () => {
  wx.getPrivacySetting({
    //查询隐私授权情况
    success(res) {
      console.log(res);
      getApp().globalData.showPrivacy = res.needAuthorization;
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1].route;
      if (res.needAuthorization && currentPage != "pages/index/index") {
        //true：没有授权，false：授权过
        console.log("跳转");
        jumpTo();
      }
    },
  });
  const jumpTo = () => {
    uni.redirectTo({
      url: "/pages/index/index",
    });
  };
};

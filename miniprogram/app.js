App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://yourserver.com/api/login',
            data: { code: res.code },
            success: res => {
              this.globalData.userInfo = res.data.userInfo;
              this.globalData.token = res.data.token;
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token: null
  }
})

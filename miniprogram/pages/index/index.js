Page({
  data: {
    message: '欢迎来到传声墙'
  },
  navigateToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
})

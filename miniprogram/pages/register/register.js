Page({
  data: {
    phoneNumber: '',
  },
  bindPhoneInput(e) {
    this.setData({ phoneNumber: e.detail.value });
  },
  submit() {
    if (this.data.phoneNumber) {
      wx.request({
        url: 'https://yourserver.com/api/register',
        method: 'POST',
        data: { phoneNumber: this.data.phoneNumber },
        success: res => {
          if (res.data.success) {
            wx.navigateTo({
              url: '/pages/profile/profile'
            });
          } else {
            wx.showToast({
              title: '注册失败，请重试',
              icon: 'none'
            });
          }
        }
      });
    } else {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
    }
  }
})

Page({
  data: {
    nickname: '',
    birthdate: '',
    role: 'parent',
    gender: 'male'
  },
  bindNicknameInput(e) {
    this.setData({ nickname: e.detail.value });
  },
  bindBirthdateChange(e) {
    this.setData({ birthdate: e.detail.value });
  },
  bindRoleChange(e) {
    this.setData({ role: e.detail.value });
  },
  bindGenderChange(e) {
    this.setData({ gender: e.detail.value });
  },
  submit() {
    if (this.data.nickname && this.data.birthdate) {
      wx.request({
        url: 'https://yourserver.com/api/profile',
        method: 'POST',
        data: this.data,
        success: res => {
          if (res.data.success) {
            wx.switchTab({
              url: '/pages/index/index'
            });
          } else {
            wx.showToast({
              title: '提交失败，请重试',
              icon: 'none'
            });
          }
        }
      });
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
    }
  }
})

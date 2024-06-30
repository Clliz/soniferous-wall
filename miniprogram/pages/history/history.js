Page({
  data: {
    history: []
  },
  onLoad() {
    this.loadHistory();
  },
  loadHistory() {
    wx.request({
      url: 'https://yourserver.com/api/history',
      header: {
        'Authorization': `Bearer ${getApp().globalData.token}`
      },
      success: res => {
        this.setData({ history: res.data });
      }
    });
  }
})

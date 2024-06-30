Page({
  data: {
    tasks: []
  },
  onLoad() {
    this.loadTasks();
  },
  loadTasks() {
    wx.request({
      url: 'https://yourserver.com/api/tasks',
      header: {
        'Authorization': `Bearer ${getApp().globalData.token}`
      },
      success: res => {
        this.setData({ tasks: res.data });
      }
    });
  }
})

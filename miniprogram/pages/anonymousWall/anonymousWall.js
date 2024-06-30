Page({
  data: {
    posts: [],
    newPost: '',
    loading: false
  },
  onLoad() {
    this.loadPosts();
  },
  loadPosts() {
    wx.request({
      url: 'https://yourserver.com/api/posts',
      success: res => {
        this.setData({ posts: res.data });
      }
    });
  },
  bindInput(e) {
    this.setData({ newPost: e.detail.value });
  },
  submitPost() {
    if (this.data.newPost) {
      this.setData({ loading: true });
      wx.request({
        url: 'https://yourserver.com/api/posts',
        method: 'POST',
        header: {
          'Authorization': `Bearer ${getApp().globalData.token}`
        },
        data: { content: this.data.newPost },
        success: res => {
          this.loadPosts();
          this.setData({ newPost: '', loading: false });
        }
      });
    }
  }
})

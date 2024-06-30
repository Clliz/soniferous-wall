Page({
  data: {
    messages: [],
    newMessage: '',
    loading: false,
    emotion: 'neutral'
  },
  onLoad() {
    this.loadMessages();
  },
  loadMessages() {
    wx.request({
      url: 'https://yourserver.com/api/messages',
      header: {
        'Authorization': `Bearer ${getApp().globalData.token}`
      },
      success: res => {
        this.setData({ messages: res.data });
      }
    });
  },
  bindInput(e) {
    this.setData({ newMessage: e.detail.value });
  },
  async submitMessage() {
    if (this.data.newMessage) {
      this.setData({ loading: true });
      try {
        const response = await this.callErnie(this.data.newMessage);
        const emotion = await this.detectEmotion(response);
        this.setData({ emotion });

        if (emotion === 0) {  // 负向情绪
          this.recordAndStopConversation(response);
        } else {
          wx.request({
            url: 'https://yourserver.com/api/messages',
            method: 'POST',
            header: {
              'Authorization': `Bearer ${getApp().globalData.token}`
            },
            data: { content: response },
            success: res => {
              this.loadMessages();
              this.setData({ newMessage: '', loading: false });
            }
          });
        }
      } catch (error) {
        console.error('Error calling ERNIE Bot:', error);
        this.setData({ loading: false });
      }
    }
  },
  detectEmotion(message) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://yourserver.com/api/emotion',
        method: 'POST',
        data: { message },
        success: res => {
          resolve(res.data.emotion);
        },
        fail: err => {
          reject(err);
        }
      });
    });
  },
  recordAndStopConversation(message) {
    wx.request({
      url: 'https://yourserver.com/api/conversation',
      method: 'POST',
      header: {
        'Authorization': `Bearer ${getApp().globalData.token}`
      },
      data: {
        content: message,
        action: 'stop'
      },
      success: res => {
        wx.showToast({
          title: '对话已终止，情绪失控',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    });
  }
})

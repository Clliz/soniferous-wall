const API_BASE = 'https://yourserver.com/api';

const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE}${url}`,
      method: method,
      data: data,
      header: {
        'Authorization': `Bearer ${getApp().globalData.token}`
      },
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

module.exports = {
  getMessages: () => request('/messages', 'GET'),
  sendMessage: (message) => request('/messages', 'POST', { content: message }),
  detectEmotion: (message) => request('/emotion', 'POST', { message }),
  getPosts: () => request('/posts', 'GET'),
  createPost: (post) => request('/posts', 'POST', { content: post }),
  getTasks: () => request('/tasks', 'GET'),
  getHistory: () => request('/history', 'GET')
};

const API_KEY = 'YOUR_OPENAI_API_KEY';

const callGPT = (prompt) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        prompt: prompt,
        max_tokens: 150
      },
      success(res) {
        if (res.data.choices && res.data.choices.length > 0) {
          resolve(res.data.choices[0].text);
        } else {
          reject('No response from GPT-3');
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  callGPT
};

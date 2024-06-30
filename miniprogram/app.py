from flask import Flask, request, jsonify
import requests
import json
import time

app = Flask(__name__)

API_KEY = 'I5zYeOhucL70ptrDpeVZzba1'
SECRET_KEY = 'TDlg5vOWn5P0qPR2i4Dr345zOW9DKqpY'
ACCESS_TOKEN = None
TOKEN_EXPIRES = 0

def get_access_token():
    global ACCESS_TOKEN, TOKEN_EXPIRES
    if ACCESS_TOKEN is None or time.time() > TOKEN_EXPIRES:
        url = f"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={API_KEY}&client_secret={SECRET_KEY}"
        response = requests.get(url)
        data = response.json()
        ACCESS_TOKEN = data['access_token']
        TOKEN_EXPIRES = time.time() + data['expires_in'] - 60  # 提前60秒刷新
    return ACCESS_TOKEN

@app.route('/api/emotion', methods=['POST'])
def detect_emotion():
    data = request.json
    message = data.get('message')
    
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    
    access_token = get_access_token()
    url = f"https://aip.baidubce.com/rpc/2.0/nlp/v1/sentiment_classify?access_token={access_token}"
    headers = {'Content-Type': 'application/json'}
    payload = {'text': message}

    response = requests.post(url, headers=headers, data=json.dumps(payload))
    result = response.json()
    if 'items' in result and len(result['items']) > 0:
        emotion = result['items'][0]['sentiment']  # sentiment: 0-负向, 1-中性, 2-正向
        return jsonify({'emotion': emotion}), 200
    else:
        return jsonify({'error': 'Failed to analyze emotion'}), 500

if __name__ == '__main__':
    app.run(debug=True)

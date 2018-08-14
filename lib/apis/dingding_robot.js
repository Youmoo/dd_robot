/**
 * 钉钉机器人api
 */


// 请求总地址
const uri = 'https://oapi.dingtalk.com/robot/send';

const request = require('request');
const cb = require('./request_callback');

const text = ({token, text}) => new Promise((resolve, reject) => {
    request({
        uri,
        method: 'POST',
        qs: {
            access_token: token
        },
        json: true,
        body: {
            msgtype: 'text',
            text: {
                'content': text
            }
        }
    }, cb(resolve, reject))
});

// 发送markdown格式的通知
const markdown = ({token, title, text}) => new Promise((resolve, reject) => {
    request({
        uri,
        method: 'POST',
        qs: {
            access_token: token
        },
        json: true,
        body: {
            "msgtype": "markdown",
            "markdown": {
                title,
                text
            }
        }
    }, cb(resolve, reject))
});

module.exports = {
    text,
    markdown
};


const fs = require('fs');
const uuid = require('uuid/v4');
const redis = require('redis');
const debug = require('debug')('dd_robot');
const checksum = require('./apis/checksum');

const {redis: config, log_dir, log_host, token} = require('./config');

const client = redis.createClient(config);
const redisSub = redis.createClient(config);

client.on('ready', () => {
    client.client('setname', 'dd_robot');
});

const throttler = require('./apis/redis')(client);

const robot = require('./apis/dingding_robot');

const threshold = 1000 * 60 * 5;// 阈值为5分钟

redisSub.client('setname', 'dd_robot:sub');
redisSub
    .on('message', (channel, msg) => {
        const sha1 = checksum(msg, 'sha1');

        debug(`收到消息: channel => %s, sha1 => %s`, channel, sha1);

        throttler.read(sha1)
            .then(data => {

                if (!data || (Date.now() - data > threshold)) {// data是一个字符串时间戳
                    return 1;
                }
                return -1;

            })
            .then(data => {
                if (data === -1) {
                    debug('消息截流: %s', sha1);
                    return;
                }
                debug('发送通知: %s', sha1);
                writeLog(msg)
                    .then(file => {
                        msg = format(msg, file);
                        return robot.markdown({token, title: '报错通知', text: msg})

                    })
                    .then(res => {
                        debug('发送钉钉消息成功.');
                        throttler.write(sha1);
                    })
                    .catch(err => {
                        debug("发送钉钉消息失败.", err);
                    });
            });


    }).subscribe('dd_robot');

debug('启动成功.');


// 将日志写入文件
function writeLog(msg) {
    const log_file = uuid() + '.log';

    return new Promise((resolve, reject) => {
        fs.writeFile(log_dir + '/' + log_file, msg, (err) => {
            err ? reject(err) : resolve(log_file);
        })
    });
}

// 格式化错误日志
function format(msg, log_file) {
    msg = msg.replace(/^- message: [^]+/m, '');
    msg = `
${msg}
- [错误日志](${log_host}/${log_file})
`;
    return msg;
}

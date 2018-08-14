const redis = require('redis').createClient();

redis.get('abc', (err, rep) => {
    console.log(err, rep);
});

redis.setex('b', 5, 'world', (err, rep) => {
    console.log(err, rep);
});

const yej_test = {
    host: '121.40.57.9',
    port: 6379,
    password: 'yunejian-redis-100'
};

// 使用redis pubsub时，需要另建client实例
const redisSub = require('redis').createClient(yej_test);

redisSub
    .on('message', (channel, msg) => {
        console.log(channel, msg);
    }).subscribe('dd_robot');

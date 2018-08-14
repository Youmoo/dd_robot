/**
 * 用来对错误报警进行截流
 */

const key = 'dd_robot:throttle';
module.exports = redis => {
    return {
        write(id){// 将日志写入redis
            redis.zadd(key, Date.now(), id, redis.print);
        },
        read(id, cb){
            return new Promise((resolve, reject) => {
                redis.zscore(key, id, (err, data) => {
                    err ? reject(err) : resolve(data);
                })
            });
        }
    }
};
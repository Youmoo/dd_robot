const path = require('path');
const {
    NODE_ENV,
    REDIS_HOST: host = '127.0.0.1',
    REDIS_PORT: port = 6379,
    REDIS_PASSWORD: password,
    LOG_DIR,
    LOG_HOST: log_host,
    TOKEN: token
} = process.env;

if (!token) {
    throw new Error("`TOKEN` is required.");
}

module.exports = {
    prod: NODE_ENV === 'production',
    redis: {host, port: +port, password: password || undefined},
    log_dir: path.resolve(LOG_DIR, __dirname + '/../logs'),
    log_host,
    token,
};

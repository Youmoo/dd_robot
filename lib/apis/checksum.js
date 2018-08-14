//https://blog.tompawlak.org/calculate-checksum-hash-nodejs-javascript

const crypto = require('crypto');

function checksum(str, algorithm = 'md5', encoding = 'hex') {
    return crypto
        .createHash(algorithm)
        .update(str, 'utf8')
        .digest(encoding)
}

module.exports = checksum;
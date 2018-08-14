const checksum = require('./checksum');

const content = 'abc';

console.log(checksum(content));

console.log(checksum(content, 'sha1'));
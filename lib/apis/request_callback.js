const factory = (resolve, reject, parse = false) =>
    (err, res, body) =>
        err ? reject(err) : resolve(parse ? JSON.parse(body) : body);

module.exports = factory;
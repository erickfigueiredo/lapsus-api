const JWT = require('jsonwebtoken');

const generate = payload => new Promise((resolve, reject) => {
    JWT.sign(payload, process.env.JWT_SECRET, { algorithm: process.env.JWT_TOKEN_ALGORITHM }, function (e, token) {
        if (e) reject(e);

        resolve(token);
    });
});

module.exports = { generate };

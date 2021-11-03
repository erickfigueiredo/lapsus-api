const JWT = require('jsonwebtoken');

const generateToken = payload => new Promise((resolve, reject) => {
    JWT.sign(payload, process.env.JWT_TKN_SECRET, { algorithm: process.env.JWT_TKN_ALGORITHM, expiresIn: '7d' },
        (error, token) => {
            if (error) reject(error);
            else resolve(token);
        }
    );
});


module.exports = { generateToken };

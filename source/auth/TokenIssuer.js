const JWT = require('jsonwebtoken');

const generateAccessToken = payload => new Promise((resolve, reject) => {
    JWT.sign(payload, process.env.ACCESS_TKN_SECRET, { algorithm: process.env.JWT_TOKEN_ALGORITHM, expiresIn: '15m' },
        (error, token) => {
            if (error) reject(error);
            else resolve(token);
        }
    );
});

const generateRefreshToken = payload => new Promise((resolve, reject) => {
    JWT.sign(payload, process.env.ACCESS_TKN_SECRET, { algorithm: process.env.JWT_TOKEN_ALGORITHM},
        (error, token) => {
            if (error) reject(error);
            else resolve(token);
        }
    );
});

module.exports = { generateAccessToken, generateRefreshToken };

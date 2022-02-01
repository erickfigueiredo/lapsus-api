const rateLimit = require('express-rate-limit');

const requestLimiter = rateLimit({
    windowMs: (parseInt(process.env.RATE_MINUTE) || 1) * 60 * 1000, // 30 segundos
    max: (parseInt(process.env.RATE_LIMIT) || 30), // Limite de requisições
    handler(req, res) {
        return res.status(429).send({ success: false, message: 'Você excedeu o limite de requisições, tente novamente mais tarde!' })
    }
});

module.exports = requestLimiter;

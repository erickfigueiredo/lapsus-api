const rateLimit = require('express-rate-limit');

const requestLimiter = rateLimit({
    windowMs: (parseInt(process.env.RATE_MINUTE) || 0.5) * 60 * 1000, // tempo medido em minutos
    max: (parseInt(process.env.RATE_LIMIT) || 30), // Limite de requisições
    standardHeaders: true,
    legacyHeaders: false,
    handler(req, res, next) {
        if(req.path.includes('/legend')) return next();
        return res.status(429).send({ success: false, message: 'Você excedeu o limite de requisições, tente novamente mais tarde!' })
    }
});

module.exports = requestLimiter;

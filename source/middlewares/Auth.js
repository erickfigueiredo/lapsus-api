require('dotenv').config();

const JWT = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ success: false, message: 'Token não fornecido!' });


    const tokenParts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).send({ success: false, message: 'Erro no token!' });


    const [scheme, token] = tokenParts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ success: false, message: 'Erro de token mal formatado!' });

    JWT.verify(token, process.env.JWT_SECRET, (error, decoded)=> {
        if(error) res.status(401).send({success: false, message: 'Erro de token inválido!'});

        req.locals = decoded;

        return next();
    });
}

module.exports = {
    authenticate
};

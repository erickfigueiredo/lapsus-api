const JWT = require('jsonwebtoken');

const ensureAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ success: false, message: 'Token não fornecido!' });


    const tokenParts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).send({ success: false, message: 'Erro no token!' });


    const [scheme, token] = tokenParts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ success: false, message: 'Erro de token mal formatado!' });

    try {
        JWT.verify(token, process.env.JWT_SECRET);
        return next();
    } catch(error) {
        return res.status(401).send({success: false, message: 'Token inválido!'}); 
    }
}

module.exports = {
    ensureAuthentication
};

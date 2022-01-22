const allowOwnUser = (req, res, next) => {
    let id = null;

    id = parseInt(req.params.id || req.body.id);

    if (isNaN(id)) {
        return res.status(400).send({ success: false, message: 'Id inválido!' });
    }

    return (id === req.locals.id) ? next()
        : res.status(401).send({ success: false, message: 'Rota restrita ao proprietário do recurso!' });
};

const allowAdmin = (req, res, next) => {
    return (req.locals.type === 'A') ? next() :
        res.status(401).send({ success: false, message: 'Rota restrita à administradores!' });
};

const allowTechnician = (req, res, next) => {
    return (req.locals.type === 'T') ? next() :
        res.status(401).send({ success: false, message: 'Rota restrita à técnicos!' });
};

const allowManager = (req, res, next) => {
    return (req.locals.type === 'A' || req.locals.type === 'T') ? next() :
        res.status(401).send({ success: false, message: 'Rota restrita à gestores!' });
};

const allowRegisteredAndModerator = (req, res, next) => {
    return (req.locals.type === 'R' || req.locals.type === 'M') ? next() :
        res.status(401).send({ success: false, message: 'Rota restrita à não gestores!' });
};

const allowManagerAndModerator = (req, res, next) => {
    return (req.locals.type !== 'R') ? next() :
        res.status(401).send({ success: false, message: 'Rota restrita à gestores e moderadores!' });
};

module.exports = {
    allowOwnUser,
    allowAdmin,
    allowTechnician,
    allowManager,
    allowRegisteredAndModerator,
    allowManagerAndModerator
};

const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        desc: Joi.string().email().messages({
            'string.email': 'Espaços no inicio ou no fim não são permitidos'
            
        }),
    })
}

module.exports = { createValidate }
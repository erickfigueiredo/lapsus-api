const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        datime: Joi.date().max('now').messages({
            'date.max': 'Momento da identificação não pode ser no futuro!'
        }),
    })
}

module.exports = { createValidate }
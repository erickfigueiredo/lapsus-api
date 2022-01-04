const Joi = require('joi');

const loginValidate = () => {
    return Joi.object().keys({
        email: Joi.string().trim().email().required().messages({
            'string.email': 'E-mail inválido!',
            'string.empty': 'Campo e-mail não pode ser vazio!',
            'any.required': 'Campo e-mail é obrigatório!'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'Campo senha não pode ser vazio!',
            'any.required': 'Campo senha é obrigatório!'
        })
    })
}

module.exports = {loginValidate};

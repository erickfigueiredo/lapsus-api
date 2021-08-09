const Joi = require('joi');

const loginValidate = () => {
    return Joi.object().keys({
        email: Joi.string().trim().email().required().messages({
            'string.email': 'E-mail inválido!',
            'string.empty': 'Campo e-mail não pode ser vazio!',
            'any.required': 'E-mail é obrigatório!'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'Campo senha não pode ser vazio!',
            'any.required': 'Senha é obrigatória!'
        })
    })
}

module.exports = {loginValidate};

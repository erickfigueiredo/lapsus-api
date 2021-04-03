const Joi = require('joi');

const loginValidate = () => {
    return Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'E-mail inválido!',
            'string.empty': 'É necessário informar um e-mail!',
            'any.required': 'E-mail é obrigatório!'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'É necessário informar uma senha!',
            'any.required': 'Senha é obrigatória!'
        })
    })
}

module.exports = {loginValidate};

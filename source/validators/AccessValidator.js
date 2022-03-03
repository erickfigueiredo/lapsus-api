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
};

const resetPassword = () => {
    return Joi.object().keys({
        id_user: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Campo id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        }),
        token: Joi.string().regex(/^(?:[\w-]*\.){2}[\w-]*$/).messages({
            'string.pattern.base': '',
            'string.empty': 'Token não pode ser vazio',
            'any.required': 'Token é obrigatório!'
        }),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).max(30).required().messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial ($*&@#)!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!',
            'string.empty': 'Campo senha não pode ser vazio!',
            'any.required': 'Senha é obrigatória!'
        })
    })
};

const tokenPassword = () => {
    return Joi.object().keys({
        email: Joi.string().trim().email().required().messages({
            'string.email': 'E-mail inválido!',
            'string.empty': 'Campo e-mail não pode ser vazio!',
            'any.required': 'Campo e-mail é obrigatório!'
        })
    })
};

module.exports = { loginValidate, resetPassword, tokenPassword };

const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^[A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas letras!',
            'string.min': 'Nome deve conter no mínimo 2 letras!',
            'string.max': 'Nome deve conter no máximo 50 letras!',
            'string.empty': 'É necessário informar um nome!',
            'any.required': 'Nome é obrigatório!'
        }),
        tel: Joi.string().regex(/^[0-9]{11,12}$/).required().messages({
            'string.empty': 'Telefone não pode ser nulo!',
            'string.pattern.base': 'Telefone deve ter 12-13 caracteres numéricos!',
            'any.required': 'Telefone é obrigatório!'
        }),
        address: Joi.string().regex(/^[0-9A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(10).max(256).required().messages({
            'string.pattern.base': 'Endereço deve conter apenas letras e números!',
            'string.min': 'Endereço deve conter no mínimo 10 caracteres!',
            'string.max': 'Endereço deve conter no máximo 256 caracteres!',
            'string.empty': 'É necessário informar um endereço!',
            'any.required': 'Endereço é obrigatório!'
        }),
        email: Joi.string().email().messages({
            'string.email': 'E-mail inválido!',
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.* [a - z])(?=.* [A - Z])(?=.* [$ *&@#])[0 - 9a - zA - Z$ *&@#]$ /).messages({
            'string.pattern.base': 'A senha deve conter no mínimo 10 caracteres, sendo pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 10 caracteres!',
            'string.max': 'Senha deve conter no máximo 50 caracteres!',
        }),
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id!',
            'any.required': 'Id é obrigatório!'
        }),
        name: Joi.string().regex(/^[A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas letras!',
            'string.min': 'Nome deve conter no mínimo duas letras!',
            'string.max': 'Nome deve conter no máximo cinquenta letras!',
            'string.empty': 'É necessário informar um nome!',
            'any.required': 'Nome é obrigatório!'
        }),
        tel: Joi.string().regex(/^[0-9]{11,12}$/).required().messages({
            'string.empty': 'Telefone não pode ser nulo!',
            'string.pattern.base': 'Telefone deve ter 12-13 caracteres numéricos!',
            'any.required': 'Telefone é obrigatório!'
        }),
        address: Joi.string().regex(/^[0-9A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(10).max(256).required().messages({
            'string.pattern.base': 'Endereço deve conter apenas letras e números!',
            'string.min': 'Endereço deve conter no mínimo 10 caracteres!',
            'string.max': 'Endereço deve conter no máximo 256 caracteres!',
            'string.empty': 'É necessário informar um endereço!',
            'any.required': 'Endereço é obrigatório!'
        }),
        email: Joi.string().email().messages({
            'string.email': 'E-mail inválido!',
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.* [a - z])(?=.* [A - Z])(?=.* [$ *&@#])[0 - 9a - zA - Z$ *&@#]$ /).messages({
            'string.pattern.base': 'A senha deve conter no mínimo 10 caracteres, sendo pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 10 caracteres!',
            'string.max': 'Senha deve conter no máximo 50 caracteres!',
        }),
    });
}

module.exports = { createValidate, updateValidate };


const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 letras!',
            'string.max': 'Nome deve conter no máximo 50 letras!',
            'string.empty': 'Campo nome não pode ser vazio!',
            'any.required': 'Campo nome é obrigatório!'
        }),
        phone: Joi.string().regex(/^[0-9]{3,11}$/).required().messages({
            'string.pattern.base': 'Telefone deve ter de 3 à 11 caracteres numéricos!',
            'string.empty': 'Campo telefone não pode ser vazio!',
            'any.required': 'Campo telefone é obrigatório!'
        })
    })
}

const updateValidate = () => {
    return Joi.object().keys({
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        }),
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 caracteres!',
            'string.max': 'Nome deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo nome não pode ser vazio!'
        }),
        phone: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9]{3,11}$/).messages({
            'string.pattern.base': 'Telefone deve ter de 3 à 11 caracteres numéricos!',
            'string.empty': 'Campo telefone não pode ser vazio!'
        }),
    })
}

module.exports = { createValidate, updateValidate };

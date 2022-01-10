const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        title: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(50).required().messages({
            'string.pattern.base': 'Descrição deve conter apenas letras e números!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo título não pode ser vazio!',
            'any.required': 'Título é obrigatório!'
        }),
        desc: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(100).messages({
            'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 100 caracteres!',
            'string.empty': 'Campo descrição não pode ser vazio!'
        })
    })
}

const updateValidate = () => {
    return Joi.object().keys({
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Campo id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        }),
        title: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(50).messages({
            'string.pattern.base': 'Descrição deve conter apenas letras e números!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo título não pode ser vazio!'
        }),
        desc: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).empty('').min(3).max(100).messages({
            'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 100 caracteres!'
        })
    })
}

module.exports = { createValidate, updateValidate};

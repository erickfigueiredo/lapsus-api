const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        title: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(50).required().messages({
            'string.pattern.base': 'Descrição deve conter apenas letras e números!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 50 caracteres!',
            'string.empty': 'É necessário informar um título!',
            'any.required': 'Título é obrigatório!'
        }),
        desc: Joi.string().trim().min(3).max(100).messages({
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 100 caracteres!'
        }),
        added_by: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id adicionador deve ser um número inteiro!',
            'number.min': 'Id adicionador não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id adicionador!',
            'any.required': 'Id adicionador é obrigatório!'
        })
    })
}

const updateValidate = () => {
    return Joi.object().keys({
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id!',
            'any.required': 'Id é obrigatório!'
        }),
        title: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(50).messages({
            'string.pattern.base': 'Descrição deve conter apenas letras e números!',
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 50 caracteres!',
        }),
        desc: Joi.string().trim().min(3).max(100).messages({
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 100 caracteres!'
        })
    })
}

module.exports = { createValidate, updateValidate};

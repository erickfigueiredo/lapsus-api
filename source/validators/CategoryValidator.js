const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Categoria deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Categoria deve conter no mínimo 2 letras!',
            'string.max': 'Categoria deve conter no máximo 50 letras!',
            'string.empty': 'É necessário informar um categoria!',
            'any.required': 'Categoria é obrigatório!'
        }),
        desc: Joi.string().trim().min(3).max(500).messages({
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 500 caracteres!'
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
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Categoria deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Categoria deve conter no mínimo 2 letras!',
            'string.max': 'Categoria deve conter no máximo 50 letras!',
        }),
        desc: Joi.string().trim().min(3).max(500).messages({
            'string.min': 'Descrição deve conter no mínimo 3 caracteres!',
            'string.max': 'Descrição deve conter no máximo 500 caracteres!'
        })
    })
}

module.exports = {
    createValidate,
    updateValidate
};

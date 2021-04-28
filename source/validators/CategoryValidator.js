const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        // 50: Obrigatório
        name: Joi.string().regex(/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Remetente deve conter apenas letras!',
            'string.min': 'Remetente deve conter no mínimo 2 letras!',
            'string.max': 'Remetente deve conter no máximo 50 letras!',
            'string.empty': 'É necessário informar um remetente!',
            'any.required': 'Remetente é obrigatório!'
        }),
        // 500
        desc: Joi.string().regex(/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ. ]+$/).min(3).max(500).messages({
            'string.pattern.base': 'Remetente deve conter apenas letras!',
            'string.min': 'Remetente deve conter no mínimo 3 letras!',
            'string.max': 'Remetente deve conter no máximo 500 letras!'
        })
    })
}

const updateValidate = () => {
    return Joi.object().keys({
        // Obrigatório
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id!',
            'any.required': 'Id é obrigatório!'
        }),
        // 50: Obrigatório
        name: Joi.string().regex(/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Remetente deve conter apenas letras!',
            'string.min': 'Remetente deve conter no mínimo 2 letras!',
            'string.max': 'Remetente deve conter no máximo 50 letras!'
        }),
        // 500
        desc: Joi.string().regex(/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(500).messages({
            'string.pattern.base': 'Remetente deve conter apenas letras!',
            'string.min': 'Remetente deve conter no mínimo 3 letras!',
            'string.max': 'Remetente deve conter no máximo 500 letras!'
        })
    })
}

module.exports = { createValidate, updateValidate };

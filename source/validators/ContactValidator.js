const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        sender: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Remetente deve conter apenas letras!',
            'string.min': 'Remetente deve conter no mínimo 2 letras!',
            'string.max': 'Remetente deve conter no máximo 50 letras!',
            'string.empty': 'É necessário informar um remetente!',
            'any.required': 'Remetente é obrigatório!'
        }),
        subject: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(50).required().messages({
            'string.pattern.base': 'Remetente deve conter apenas letras!',
            'string.min': 'Remetente deve conter no mínimo 3 letras!',
            'string.max': 'Remetente deve conter no máximo 50 letras!',
            'string.empty': 'É necessário informar um remetente!',
            'any.required': 'Remetente é obrigatório!'
        }),
        email: Joi.string().email().max(100).required().messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!',
            'string.empty': 'É necessário informar um e-mail!',
            'any.required': 'E-mail é obrigatório!'
        }),
        body: Joi.string().min(10).max(500).required().messages({
            'string.min': 'A mensagem deve ter no mínimo 10 caracteres!',
            'string.max': 'A mensagem deve ter no máximo 500 caracteres!',
            'string.empty': 'É necessário conter uma mensagem!',
            'any.required': 'Mensagem é obrigatória!',
        })
    })
}

module.exports = { createValidate };

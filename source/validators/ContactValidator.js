const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        sender: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Remetente deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Remetente deve conter no mínimo 2 letras!',
            'string.max': 'Remetente deve conter no máximo 50 letras!',
            'string.empty': 'Campo remetente não pode ser vazio!',
            'any.required': 'Remetente é obrigatório!'
        }),
        subject: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(50).required().messages({
            'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
            'string.min': 'Assunto deve conter no mínimo 3 letras!',
            'string.max': 'Assunto deve conter no máximo 50 letras!',
            'string.empty': 'Campo assunto não pode ser vazio!',
            'any.required': 'Assunto é obrigatório!'
        }),
        email: Joi.string().email().max(100).required().messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!',
            'string.empty': 'Campo e-mail não pode ser vazio!',
            'any.required': 'E-mail é obrigatório!'
        }),
        body: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(10).max(500).required().messages({
            'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
            'string.min': 'A mensagem deve ter no mínimo 10 caracteres!',
            'string.max': 'A mensagem deve ter no máximo 500 caracteres!',
            'string.empty': 'Campo mensagem não pode ser vazio!',
            'any.required': 'Mensagem é obrigatória!',
        })
    })
}

module.exports = { createValidate };

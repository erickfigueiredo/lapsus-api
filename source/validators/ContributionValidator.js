const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        occurrence: Joi.date().max('now').required().messages({
            'date.max': 'Data não pode ser no futuro!',
            'date.empty': 'É necessário informar uma data de ocorrência!',
            'date.required': 'Data de ocorrência é obrigatória!'
        }),
        risk_damage: Joi.boolean().required().messages({
            'boolean.empty': 'É necessário informar se há riscos!',
            'boolean.required': 'É obrigatório informar se há riscos!'
        }),
        victims: Joi.boolean().required().messages({
            'boolean.empty': 'É necessário informar se há vítimas!',
            'boolean.required': 'É obrigatório informar se há vítimas!'
        }),
        body: Joi.string().min(10).max(500).required().messages({
            'string.min': 'A mensagem deve ter no mínimo 10 caracteres!',
            'string.max': 'A mensagem deve ter no máximo 500 caracteres!',
            'string.empty': 'É necessário conter uma mensagem!',
            'any.required': 'Mensagem é obrigatória!',
        }),
        published: Joi.regex(/^[AN]{1}$/).required().messages({
            
        }),
        local: '',
        category: '',
        collaborator: ''
    });
}

module.exports = { createValidate };

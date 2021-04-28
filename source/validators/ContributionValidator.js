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
        desc: Joi.string().regex(/^[a-zA-Z]*.[0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s.]{,10}$/gm).required().messages({
            'string.min': 'A mensagem deve ter no mínimo 10 caracteres!',
            'string.max': 'A mensagem deve ter no máximo 500 caracteres!',
            'string.empty': 'É necessário conter uma mensagem!',
            'any.required': 'Mensagem é obrigatória!',
        }),
        

        local: '',
        category: '',
        collaborator: ''
    });
}

module.exports = { createValidate };

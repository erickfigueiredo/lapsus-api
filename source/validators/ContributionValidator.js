const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        occurrence: Joi.date().max('now').required().messages({
            'date.max': 'Ocorrência não pode ser no futuro!',
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
        desc: Joi.string().trim().min(3).max(500).messages({
            'string.min': 'Descrição deve conter no mínimo 3 letras!',
            'string.max': 'Descrição deve conter no máximo 500 letras!'
        }),
        // Regex
        local: Joi.string().required().messages({
            'string.empty': 'É necessário informar as coordenadas!',
            'string.required': 'É obrigatório informar as coordenadas!'
        }),
        id_category: Joi.number().integer().min(2).required().messages({
            'number.integer': 'Id de categoria deve ser um número inteiro!',
            'number.min': 'Id de categoria não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id de categoria!',
            'any.required': 'Id de categoria é obrigatório!'
        }),
        collaborator: Joi.number().integer().min(1).messages({
            'number.integer': 'Id de colaborador deve ser um número inteiro!',
            'number.min': 'Id de colaborador não pode ser menor que 1!'
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
        published: Joi.string().regex(/^[AR]{1}$/).required().messages({
            'string.pattern.base': 'Status de publicação deve ser aprovado ou reprovado!',
            'string.empty': 'É necessário informar um status de publicação!',
            'string.required': 'É obrigatório informar um status de publicação'
        }),
        id_manager: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id do gestor deve ser um número inteiro!',
            'number.min': 'Id do gestor não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id do gestor!',
            'any.required': 'Id do gestor é obrigatório!'
        }),
    });
}

module.exports = {
    createValidate,
    updateValidate
};
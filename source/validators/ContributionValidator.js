const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        occurrence: Joi.date().max('now').required().messages({
            'date.max': 'Ocorrência não pode ser no futuro!',
            'date.empty': 'Data de ocorrência não pode ser vazia!',
            'date.required': 'Data de ocorrência é obrigatória!'
        }),
        risk_damage: Joi.boolean().required().messages({
            'boolean.empty': 'Campo de riscos não pode ser vazio!',
            'boolean.required': 'É obrigatório informar se há riscos!',
        }),
        victims: Joi.boolean().required().messages({
            'boolean.empty': 'Campo de vítimas não pode ser vazio!',
            'boolean.required': 'É obrigatório informar se há vítimas!'
        }),
        desc: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).min(3).max(500).messages({
            'string.pattern.base': 'Espaços não são permitidos no início ou no fim!',
            'string.min': 'Descrição deve conter no mínimo 3 letras!',
            'string.max': 'Descrição deve conter no máximo 500 letras!',
            'string.empty': 'Campo descrição não pode ser vazio!'
        }),

        // Regex
        local: Joi.string().required().messages({
            'string.empty': 'Campo coordenada não pode ser vazio!',
            'string.required': 'É obrigatório informar as coordenadas!'
        }),
        id_category: Joi.number().integer().min(2).required().messages({
            'number.integer': 'Categoria deve ser um número inteiro!',
            'number.min': 'Categoria não pode ser menor que 1!',
            'number.empty': 'Campo categoria não pode ser vazio!',
            'any.required': 'Categoria é obrigatória!'
        }),
        collaborator: Joi.number().integer().min(1).messages({
            'number.integer': 'Colaborador deve ser um número inteiro!',
            'number.min': 'Colaborador não pode ser menor que 1!',
            'number.empty': 'Campo colaborador não pode ser vazio!'
        }),
    });
}

const updateValidate = () => {
    return Joi.object().keys({
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Campo id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        }),
        published: Joi.string().regex(/^[AR]{1}$/).required().messages({
            'string.pattern.base': 'Status de publicação deve ser aprovado ou reprovado!',
            'string.empty': 'É necessário informar um status de publicação!',
            'string.required': 'Status de publicação não pode ser vazio!'
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
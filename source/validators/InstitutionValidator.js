const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 letras!',
            'string.max': 'Nome deve conter no máximo 50 letras!',
            'string.empty': 'Campo nome não pode ser vazio!',
            'any.required': 'Nome é obrigatório!'
        }),
        phone: Joi.string().regex(/^[0-9]{10,12}$/).required().messages({
            'string.pattern.base': 'Telefone deve ter 10-12 caracteres numéricos!',
            'string.empty': 'Campo telefone não pode ser vazio!',
            'any.required': 'Telefone é obrigatório!'
        }),
        address: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ, ]+$/).min(10).max(256).required().messages({
            'string.pattern.base': 'Endereço deve conter apenas letras e números e não deve iniciar ou terminar com espaços!',
            'string.min': 'Endereço deve conter no mínimo 10 caracteres!',
            'string.max': 'Endereço deve conter no máximo 256 caracteres!',
            'string.empty': 'Campo endereço não pode ser vazio!',
            'any.required': 'Endereço é obrigatório!'
        }),
        email: Joi.string().trim().email().max(100).required().messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!',
            'string.empty': 'Campo e-mail não pode ser vazio!',
            'any.required': 'E-mail é obrigatório!'
        }),
        added_by: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Adicionador deve ser um número inteiro!',
            'number.min': 'Adicionador não pode ser menor que 1!',
            'number.empty': 'campo adicionador não pode ser vazio!',
            'any.required': 'Adicionador é obrigatório!'
        })
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
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 caracteres!',
            'string.max': 'Nome deve conter no máximo 2 caracteres!',
            'string.empty': 'Campo nome não pode ser vazio!'
        }),
        phone: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9]{10,12}$/).messages({
            'string.empty': 'Campo telefone não pode ser vazio!',
            'string.pattern.base': 'Telefone deve ter 12-13 caracteres numéricos!'
        }),
        address: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(10).max(256).messages({
            'string.pattern.base': 'Endereço deve conter apenas letras e números!',
            'string.min': 'Endereço deve conter no mínimo 10 caracteres!',
            'string.max': 'Endereço deve conter no máximo 256 caracteres!',
            'string.empty': 'Campo endereço não pode ser vazio!'
        }),
        email: Joi.string().trim().email().messages({
            'string.email': 'E-mail inválido!',
            'string.empty': 'Campo email não pode ser vazio!'
        })
    });
}

module.exports = { createValidate, updateValidate };

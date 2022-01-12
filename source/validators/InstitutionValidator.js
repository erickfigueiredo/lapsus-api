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
        phone: Joi.string().regex(/^[0-9]{3,11}$/).required().messages({
            'string.pattern.base': 'Telefone deve ter de 3 à 11 caracteres numéricos!',
            'string.empty': 'Campo telefone não pode ser vazio!',
            'any.required': 'Telefone é obrigatório!'
        }),
        /* address: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ, ]+$/).min(10).max(256).required().messages({
            'string.pattern.base': 'Endereço deve conter apenas letras e números e não deve iniciar ou terminar com espaços!',
            'string.min': 'Endereço deve conter no mínimo 10 caracteres!',
            'string.max': 'Endereço deve conter no máximo 256 caracteres!',
            'string.empty': 'Campo endereço não pode ser vazio!',
            'any.required': 'Endereço é obrigatório!'
        }), */
        email: Joi.string().trim().email().max(100).required().messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!',
            'string.empty': 'Campo e-mail não pode ser vazio!',
            'any.required': 'E-mail é obrigatório!'
        }),
        street: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(100).required().messages({
            'string.pattern.base': 'Rua deve conter apenas letras e números e não deve iniciar ou terminar com espaços!',
            'string.min': 'Rua deve conter no mínimo 3 caracteres!',
            'string.max': 'Rua deve conter no máximo 100 caracteres!',
            'string.empty': 'Campo rua não pode ser vazio!',
            'any.required': 'Rua é obrigatória!'
        }),
        neighborhood: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(100).required().messages({
            'string.pattern.base': 'Bairro deve conter apenas letras e números e não deve iniciar ou terminar com espaços!',
            'string.min': 'Bairro deve conter no mínimo 3 caracteres!',
            'string.max': 'Bairro deve conter no máximo 100 caracteres!',
            'string.empty': 'Campo bairro não pode ser vazio!',
            'any.required': 'Bairro é obrigatório!'
        }),
        city: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(100).required().messages({
            'string.pattern.base': 'Cidade deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Cidade deve conter no mínimo 3 caracteres!',
            'string.max': 'Cidade deve conter no máximo 100 caracteres!',
            'string.empty': 'Campo cidade não pode ser vazio!',
            'any.required': 'Cidade é obrigatório!'
        }),
        state: Joi.string().regex(/^[a-z]{2}$/i).required().messages({
            'string.pattern.base': 'Estado deve ser uma sigla com 2 letras!',
            'string.max': 'Estado deve ter 2 letras!',
            'string.min': 'Estado deve ter 2 letras!',
            'string.empty': 'Campo estado não pode ser vazio!',
            'any.required': 'Estado é obrigatório!'
        }),
        zipcode: Joi.string().regex(/^[0-9]{8}$/).required().messages({
            'string.pattern.base': 'CEP deve conter 8 números!',
            'string.max': 'CEP deve ter 8 números!',
            'string.min': 'CEP deve ter 8 números!',
            'string.empty': 'Campo CEP não pode ser vazio!',
            'any.required': 'CEP é obrigatório!'
        }),
        number: Joi.string().regex(/(^[0-9]{1,7}[a-z]?)|(SN)$/i).required().messages({
            'string.pattern.base': 'Número deve conter números seguidos de letra, máximo 8, ou SN',
            'string.empty': 'Campo número não pode ser vazio!',
            'any.required': 'Número é obrigatório!'
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
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 caracteres!',
            'string.max': 'Nome deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo nome não pode ser vazio!'
        }),
        phone: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9]{3,11}$/).messages({
            'string.empty': 'Campo telefone não pode ser vazio!',
            'string.pattern.base': 'Telefone deve ter de 3 à 11 caracteres numéricos!'
        }),
        /* address: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ, ]+$/).min(10).max(256).messages({
            'string.pattern.base': 'Endereço deve conter apenas letras e números!',
            'string.min': 'Endereço deve conter no mínimo 10 caracteres!',
            'string.max': 'Endereço deve conter no máximo 256 caracteres!',
            'string.empty': 'Campo endereço não pode ser vazio!'
        }), */
        email: Joi.string().trim().email().messages({
            'string.email': 'E-mail inválido!',
            'string.empty': 'Campo email não pode ser vazio!'
        }),
        street: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(100).messages({
            'string.pattern.base': 'Rua deve conter apenas letras e números e não deve iniciar ou terminar com espaços!',
            'string.min': 'Rua deve conter no mínimo 3 caracteres!',
            'string.max': 'Rua deve conter no máximo 100 caracteres!',
            'string.empty': 'Campo rua não pode ser vazio!'
        }),
        neighborhood: Joi.string().regex(/^(?!\s)(?!.*\s$)[0-9A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(100).messages({
            'string.pattern.base': 'Bairro deve conter apenas letras e números e não deve iniciar ou terminar com espaços!',
            'string.min': 'Bairro deve conter no mínimo 3 caracteres!',
            'string.max': 'Bairro deve conter no máximo 100 caracteres!',
            'string.empty': 'Campo bairro não pode ser vazio!'
        }),
        city: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(3).max(100).messages({
            'string.pattern.base': 'Cidade deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Cidade deve conter no mínimo 3 caracteres!',
            'string.max': 'Cidade deve conter no máximo 100 caracteres!',
            'string.empty': 'Campo cidade não pode ser vazio!'
        }),
        state: Joi.string().regex(/^[a-z]{2}$/i).messages({
            'string.pattern.base': 'Estado deve ser uma sigla com 2 letras!',
            'string.max': 'Estado deve ter 2 letras!',
            'string.min': 'Estado deve ter 2 letras!',
            'string.empty': 'Campo estado não pode ser vazio!'
        }),
        zipcode: Joi.string().regex(/^[0-9]{8}$/).messages({
            'string.pattern.base': 'CEP deve conter 8 números!',
            'string.max': 'CEP deve ter 8 números!',
            'string.min': 'CEP deve ter 8 números!',
            'string.empty': 'Campo CEP não pode ser vazio!'
        }),
        number: Joi.string().regex(/(^[0-9]{1,7}[a-z]?)|(SN)$/i).messages({
            'string.pattern.base': 'Número deve conter números seguidos de letra, máximo 8, ou SN',
            'string.empty': 'Campo número não pode ser vazio!',
        })
    });
}

module.exports = { createValidate, updateValidate };

const Joi = require('joi');

const createValidate = (type = 'T') => {

    const params = {
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas caracteres e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 caracteres!',
            'string.max': 'Nome deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo nome não pode ser vazio!',
            'any.required': 'Nome é obrigatório!'
        }),
        surname: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Sobrenome deve conter apenas caracteres e não deve iniciar ou terminar com espaços!',
            'string.min': 'Sobrenome deve conter no mínimo 2 caracteres!',
            'string.max': 'Sobrenome deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo sobrenome não pode ser vazio!',
            'any.required': 'Sobrenome é obrigatório!'
        }),
        email: Joi.string().email().max(100).required().messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!',
            'string.empty': 'Campo e-mail não pode ser vazio!',
            'any.required': 'E-mail é obrigatório!'
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]$/).min(8).max(30).required().messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!',
            'string.empty': 'Campo senha não pode ser vazio!',
            'any.required': 'Senha é obrigatória!'
        })
    };

    switch (type) {
        case 'T': params.id_institution = Joi.number().integer().min(1).required().messages({
            'number.integer': 'Instituição deve ser um número inteiro!',
            'number.min': 'Instituição não pode ser menor que 1!',
            'number.empty': 'Campo instituição não pode ser vazio!',
            'any.required': 'Instituição é obrigatório!',
        });

        case 'R': params.added_by = Joi.number().integer().min(1).messages({
            'number.integer': 'Adicionador deve ser um número inteiro!',
            'number.min': 'Adicionador não pode ser menor que 1!',
            'number.empty': 'Campo adicionador não pode ser vazio!'
        });
            break;

        default: params.added_by = Joi.number().integer().min(1).required().messages({
            'number.integer': 'Adicionador deve ser um número inteiro!',
            'number.min': 'Adicionador não pode ser menor que 1!',
            'number.empty': 'Campo adicionador não pode ser vazio!',
            'any.required': 'Adicionador é obrigatório!'
        });
            break;
    }

    return Joi.object().keys(params);
}

const updateValidate = (isTech = false) => {

    const params = {
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Campo id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        }),
        name: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Nome deve conter no mínimo 2 caracteres!',
            'string.max': 'Nome deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo nome não pode ser vazio!'
        }),
        surname: Joi.string().regex(/^(?!\s)(?!.*\s$)[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Sobrenome deve conter apenas letras e não deve iniciar ou terminar com espaços!',
            'string.min': 'Sobrenome deve conter no mínimo 2 caracteres!',
            'string.max': 'Sobrenome deve conter no máximo 50 caracteres!',
            'string.empty': 'Campo sobrenome não pode ser vazio!'
        }),
        email: Joi.string().regex(/^\S$|^\S[ \S]*\S$/).email().max(100).messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!',
            'string.empty': 'Campo e-mail não pode ser vazio!'
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/).min(8).max(30).messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!',
            'string.empty': 'Campo senha não pode ser vazio!'
        }),
    };

    if (isTech)
        params.id_institution = Joi.number().integer().min(1).messages({
            'number.integer': 'Instituição deve ser um número inteiro!',
            'number.min': 'Instituição não pode ser menor que 1!',
            'number.empty': 'O campo instituição não pode ser vazio!'
        });

    return Joi.object().keys(params);
}

module.exports = { createValidate, updateValidate };

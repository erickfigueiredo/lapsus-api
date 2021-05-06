const Joi = require('joi');

const createValidate = (type = 'T') => {

    const params = {
        name: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas letras!',
            'string.min': 'Nome deve conter no mínimo 2 letras!',
            'string.max': 'Nome deve conter no máximo 50 letras!',
            'string.empty': 'É necessário informar um nome!',
            'any.required': 'Nome é obrigatório!'
        }),
        surname: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Sobrenome deve conter apenas letras!',
            'string.min': 'Sobrenome deve conter no mínimo duas letras!',
            'string.max': 'Sobrenome deve conter no máximo cinquenta letras!',
            'string.empty': 'É necessário informar um sobrenome!',
            'any.required': 'Sobrenome é obrigatório!'
        }),
        email: Joi.string().email().max(100).required().messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!',
            'string.empty': 'É necessário informar um e-mail!',
            'any.required': 'E-mail é obrigatório!'
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).min(8).max(30).required().messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!',
            'string.empty': 'É necessário informar uma senha!',
            'any.required': 'Senha é obrigatória!'
        })
    };

    switch (type) {
        case 'T': params.id_institution = Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id instituição deve ser um número inteiro!',
            'number.min': 'Id instituição não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id instituição!',
            'any.required': 'Id da instituição é obrigatório!',
        });
        
        case 'A': params.added_by = Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id adicionador deve ser um número inteiro!',
            'number.min': 'Id adicionador não pode ser menor que 1!',
            'number.empty': 'É necessário informar um Id adicionador!',
            'any.required': 'Id adicionador é obrigatório!'
        });
        break;

        case 'R': params.added_by = Joi.number().integer().min(1).messages({
            'number.integer': 'Id adicionador deve ser um número inteiro!',
            'number.min': 'Id adicionador não pode ser menor que 1!',
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
            'number.empty': 'É necessário informar um Id!',
            'any.required': 'Id é obrigatório!'
        }),
        name: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras!',
            'string.min': 'Nome deve conter no mínimo 2 letras!',
            'string.max': 'Nome deve conter no máximo 50 letras!',
        }),
        surname: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Sobrenome deve conter apenas letras!',
            'string.min': 'Sobrenome deve conter no mínimo duas letras!',
            'string.max': 'Sobrenome deve conter no máximo cinquenta letras!',
        }),
        email: Joi.string().email().max(100).messages({
            'string.email': 'E-mail inválido!',
            'string.max': 'E-mail não pode ter mais de 100 caracteres!'
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).min(8).max(30).messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!'
        }),
    };

    if (isTech)
        params.id_institution = Joi.number().integer().min(1).messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
        });


    return Joi.object().keys(params);
}

module.exports = { createValidate, updateValidate };

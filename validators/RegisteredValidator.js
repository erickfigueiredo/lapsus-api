const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
        name: Joi.string().regex(/^[A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Nome deve conter apenas letras!',
            'string.min': 'Nome deve conter no mínimo duas letras!',
            'string.max': 'Nome deve conter no máximo cinquenta letras!',
            'string.empty': 'É necessário informar um nome!',
            'any.required': 'Nome é obrigatório!'
        }),
        surname: Joi.string().regex(/^[A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).required().messages({
            'string.pattern.base': 'Sobrenome deve conter apenas letras!',
            'string.min': 'Sobrenome deve conter no mínimo duas letras!',
            'string.max': 'Sobrenome deve conter no máximo cinquenta letras!',
            'string.empty': 'É necessário informar um sobrenome!',
            'any.required': 'Sobrenome é obrigatório!'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'E-mail inválido!',
            'string.empty': 'É necessário informar um e-mail!',
            'any.required': 'E-mail é obrigatório!'
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).min(8).max(50).required().messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 10 caracteres!',
            'string.max': 'Senha deve conter no máximo 50 caracteres!',
            'string.empty': 'É necessário informar uma senha!',
            'any.required': 'Senha é obrigatória!'
        })
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
        name: Joi.string().regex(/^[A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Nome deve conter apenas letras!',
            'string.min': 'Nome deve conter no mínimo duas letras!',
            'string.max': 'Nome deve conter no máximo cinquenta letras!',
        }),
        surname: Joi.string().regex(/^[A-Za-z-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(2).max(50).messages({
            'string.pattern.base': 'Sobrenome deve conter apenas letras!',
            'string.min': 'Sobrenome deve conter no mínimo duas letras!',
            'string.max': 'Sobrenome deve conter no máximo cinquenta letras!',
        }),
        email: Joi.string().email().messages({
            'string.email': 'E-mail inválido!',
        }),
        password: Joi.string().regex(/^(?=.*\d)(?=.* [a - z])(?=.* [A - Z])(?=.* [$ *&@#])[0 - 9a - zA - Z$ *&@#]$ /).messages({
            'string.pattern.base': 'A senha deve conter no mínimo 10 caracteres, sendo pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 10 caracteres!',
            'string.max': 'Senha deve conter no máximo 50 caracteres!',
        })
    });
}

module.exports = {createValidate, updateValidate};

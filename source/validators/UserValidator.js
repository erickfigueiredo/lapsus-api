const Joi = require('joi');

const createValidate = () => {
    return Joi.object().keys({
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
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).max(30).required().messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial ($*&@#)!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!',
            'string.empty': 'Campo senha não pode ser vazio!',
            'any.required': 'Senha é obrigatória!'
        })
    });
}

const updateValidate = () => {
    return Joi.object().min(2).keys({
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
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).max(30).messages({
            'string.pattern.base': 'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Senha deve conter no máximo 30 caracteres!',
            'string.empty': 'Campo senha não pode ser vazio!'
        }),
        new_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).max(30).messages({
            'string.pattern.base': 'A nova senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial!',
            'string.min': 'Nova senha deve conter no mínimo 8 caracteres!',
            'string.max': 'Nova senha deve conter no máximo 30 caracteres!',
            'string.empty': 'Campo nova senha não pode ser vazio!'
        })
    }).and('password', 'new_password').messages({
        'object.and': 'Senha e nova senha devem ser informadas juntas!'
    }).messages({
        'object.min': 'É necessário informar o id e algum atributo!'
    });
}

const deactivateValidate = () => {
    return Joi.object().keys({
        id: Joi.number().integer().min(1).required().messages({
            'number.integer': 'Id deve ser um número inteiro!',
            'number.min': 'Id não pode ser menor que 1!',
            'number.empty': 'Campo id não pode ser vazio!',
            'any.required': 'Id é obrigatório!'
        }),
    })
}

module.exports = {
    createValidate,
    updateValidate, 
    deactivateValidate
};

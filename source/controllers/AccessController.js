const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
const OrgInformation = require('../models/OrgInformation');
const AccessValidator = require('../validators/AccessValidator');

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);
const TokenIssuer = require('../auth/TokenIssuer');

class AccessController {

    static async login(req, res) {
        const valid = AccessValidator.loginValidate();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const login = req.body;
        const existEmail = await User.findByEmail(login.email);

        if (existEmail.success) {
            const validPassword = bcrypt.compareSync(login.password, existEmail.user.password);

            if (validPassword) {
                try {
                    const user = {
                        id: existEmail.user.id,
                        type: existEmail.user.type,
                        name: existEmail.user.name,
                        surname: existEmail.user.surname,
                        email: existEmail.user.email
                    };

                    const payload = {
                        id: existEmail.user.id,
                        type: existEmail.user.type
                    };


                    if (existEmail.user.type === 'T') {
                        user.id_institution = existEmail.user.id_institution;
                        payload.id_institution = existEmail.user.id_institution;
                    }

                    const token = await TokenIssuer.generateToken(payload);

                    return res.send({ success: true, user, token });
                } catch (e) {
                    return res.status(500).send({ success: false, message: 'Erro durante a emissão de token de acesso!' });
                }
            }
        }
        return res.status(404).send({ success: false, message: 'Email ou senha incorretos!' });
    }

    static async checkToken(req, res) {
        if (!req.params.token) {
            return res.status(400).send({ success: false, message: 'Token não informado para validação!' });
        }

        const result = await ResetToken.findOne(req.params.token);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async resetPassword(req, res) {
        const valid = AccessValidator.resetPassword();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const existUser = await User.findOne(req.body.id_user);
        if(!existUser.success) {
            return res.status(404).send(existUser);
        }

        const existToken = await ResetToken.findOne(req.body.token);
        if(!existToken.success) {
            return res.status(404).send(existToken);
        }
        
        const salt = bcrypt.genSaltSync(saltRounds);
        const pass = bcrypt.hashSync(req.body.password, salt);


        const result = await ResetToken.updatePassword(req.body.id_user, req.body.token, pass);
        return result.success ? res.send(result) : res.status(404).send(result);
    }

    static async sendTokenResetPassword(req, res) {

        const valid = AccessValidator.tokenPassword();
        const { error } = valid.validate(req.body);

        if (error) {
            return res.status(400).send({ success: false, message: error.details[0].message });
        }

        const existEmail = await User.findByEmail(req.body.email);
        if (!existEmail.success) {
            return res.send({ success: true, message: 'Você receberá um um e-mail caso a informação pertença a um usuário ativo!' });
        }

        const org = await OrgInformation.find();
        if (!org.success) {
            return res.status(500).send(org);
        }

        try {
            const payload = {
                email: existEmail.user.email,
                date: new Date().toISOString()
            };

            const token = await TokenIssuer.generateResetToken(payload);

            const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

            const result = await ResetToken.create(existEmail.user, token, ip, org.org.name);
            return result.success ? res.send(result) : res.status(500).send(result)
        } catch (err) {
            console.log(err);
            return res.status(500).send({ success: false, message: 'Erro durante a emissão de token!' });
        }
    }
};

module.exports = AccessController;

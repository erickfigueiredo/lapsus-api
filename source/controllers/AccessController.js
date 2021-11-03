User = require('../models/User');
const LoginValidator = require('../validators/LoginValidator');

const bcrypt = require('bcrypt');
const tokenIssuer = require('../auth/TokenIssuer');

class AccessController {

    static async login(req, res) {
        const valid = LoginValidator.loginValidate();
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

                    const user = { id: existEmail.user.id, type: existEmail.user.type, name: existEmail.user.name };

                    const payload = {
                        id: existEmail.user.id,
                        type: existEmail.user.type
                    };


                    if (existEmail.user.type === 'T') {
                        jwtToken.sub.userInstitution = existEmail.user.id_institution;
                        user.id_institution = existEmail.user.id_institution;
                    }

                    const token = await tokenIssuer.generateToken(payload);

                    return res.send({ success: true, user, token });
                } catch (e) {
                    console.log(e)
                    return res.status(500).send({ success: false, message: 'Erro interno no servidor, tente novamente mais tarde!' });
                }
            }
        }
        return res.status(404).send({ success: false, message: 'Email ou senha incorretos!' });
    }

    static async getUserInfo(req, res) {
        const id = req.locals.id;
        const result = await User.findOne(id);

        return result.success ? res.send(result) : res.status(404).send(result);
    }
};

// Refresh Token = O conceito gira entorno de guardar o refreshToken no banco de dados e o accessToken em um cookie, talvez

module.exports = AccessController;

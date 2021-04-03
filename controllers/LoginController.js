User = require('../models/User');
const LoginValidator = require('../validators/LoginValidator');

const bcrypt = require('bcrypt');
const Token = require('../auth/Token');

class LoginController {
    static async login(req, res) {
        const valid = LoginValidator.loginValidate();
        const { error } = valid.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });

        const { email, password } = req.body;
        const login = { email, password };

        const existEmail = await User.findByEmail(login.email);

        if (existEmail.success) {
            const validPassword = bcrypt.compareSync(login.password, existEmail.user.password);

            if (validPassword) {
                try {
                    const JWTToken = {
                        iss: 'lapsusvgi-api',
                        sub: {
                            userId: existEmail.id,
                            userType: existEmail.type,
                            userName: existEmail.name
                        }
                    }

                    if(existEmail.user.type === 'T') JWTToken.sub.userInstitution = existEmail.id_institution;

                    const token = await Token.generate(JWTToken);

                    return res.send({ success: true, token });
                } catch (e) {
                    return res.status(500).send({ success: false, message: 'Erro interno no servidor, tente novamente mais tarde!' });
                }
            }
        }
        return res.status(404).send({ success: false, message: 'Email ou senha incorretos!' });
    }
};

module.exports = LoginController;

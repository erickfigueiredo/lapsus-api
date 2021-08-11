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

                    const payload = {
                        userId: existEmail.id,
                        userType: existEmail.type,
                        userName: existEmail.name
                    };

                    // Verificar a consistencia da Instituição
                    if (existEmail.user.type === 'T') {
                        jwtToken.sub.userInstitution = existEmail.id_institution;
                    }

                    const refreshToken = await tokenIssuer.generateRefreshToken(payload);
                    const accessToken = await tokenIssuer.generateAccessToken(payload);

                    // Vamos gravar o refresh token no banco talvez armazenar o email ao invés do Id
                    


                    return res.send({ success: true, refreshToken, accessToken });
                } catch (e) {
                    return res.status(500).send({ success: false, message: 'Erro interno no servidor, tente novamente mais tarde!' });
                }
            }
        }
        return res.status(404).send({ success: false, message: 'Email ou senha incorretos!' });
    }

    static async logout(req, res) {

        // Aqui removemos o refresh token do usuário
        res.end();
    }
};

// Refresh Token = O conceito gira entorno de guardar o refreshToken no banco de dados e o accessToken em um cookie, talvez

module.exports = AccessController;

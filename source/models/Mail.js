require('dotenv').config();

const fs = require('fs');
const path = require('path');

const mailer = require('nodemailer');
const Message = require('../utils/Message');
const handlebars = require('handlebars');

const { promisify } = require('util');


class Mailer {
    constructor() {
        this.transporter = mailer.createTransport({
            host: process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            secure: true,
            auth: {
                user: process.env.SYSTEM_MAIL,
                pass: process.env.PASS_MAIL
            },
        });
    }
    async getTemplate(path) {
        try {
            const readTemplate = promisify(fs.readFile);
            const template = await readTemplate(path, { encoding: 'utf-8' });

            return template;
        } catch (e) {
            Message.warning(err);
            return null;
        }
    }

    async recoverPassword(user,token, ip, org) {
        const mailContent = {
            to: user.email,
            from: process.env.SYSTEM_MAIL,
            subject: 'Sistema Lapsus - Recuperação de Senha'
        }

        const template = await this.getTemplate(path.resolve(__dirname, '..', 'templates', 'ResetPassword.html' )); // Falta informar o path

        if (template) {
            try {
                const mailCompiled = handlebars.compile(template);

                mailContent.html = mailCompiled({
                    name: user.name,
                    token,
                    ip_address: ip,
                    instance: org,
                    instance_url: process.env.APP_URL
                });
                
                await this.transporter.sendMail(mailContent);

                return { success: true, message: 'E-mail enviado com sucesso!' };
            } catch (e) {
                Message.warning(e);
                return { success: false, message: 'Houve ao enviar o e-mail!' };
            }
        }
        return { success: false, message: 'Houve um erro ao construir o e-mail!' };
    }
}

module.exports = new Mailer();

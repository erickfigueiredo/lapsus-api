const crypto = require('crypto');
const path = require('path');

const multer = require('multer');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'shapefiles'),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'shapefiles'));
        },
        filename: (req, file, callback) => {
            const ext = file.mimetype.split('/');

            const date = new Date();

            file.key = crypto.createHash('sha256').update(file.originalname + date).digest('hex');
            file.key += `.${ext[1]}`;

            callback(null, file.key);
        }
    }),
    fileFilter: (req, file, callback) => {
        const allowedMimes = ['application/zip'];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Tipo inválido de arquivo!'));
        }
    }
};

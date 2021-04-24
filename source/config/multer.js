const crypto = require('crypto');
const path = require('path');

const multer = require('multer');

const multerConfig = (dir, allowedMimes) => {

    return {
        dest: path.resolve(__dirname, '..', '..', 'upload', dir),
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, path.resolve(__dirname, '..', '..', 'upload', dir)); 
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

            if (allowedMimes.includes(file.mimetype)) 
                callback(null, true);
            else 
                callback(new Error('Tipo inválido de arquivo!'));
        }
    }
}

module.exports = multerConfig;

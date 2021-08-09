const crypto = require('crypto');
const path = require('path');

const multer = require('multer');

const multerConfig = (dir, fileProps) => {
    return {
        dest: path.resolve(__dirname, '..', '..', 'upload', dir),
        storage: multer.diskStorage({
            destination(req, file, callback) {
                callback(null, path.resolve(__dirname, '..', '..', 'upload', dir));
            },
            filename(req, file, callback) {
                console.log(file)
                const ext = file.mimetype.split('/');

                const date = new Date();

                file.key = crypto.createHash('sha256').update(file.originalname + date).digest('hex');
                file.key += `.${ext[1]}`;

                callback(null, file.key);
            }
        }),
        limits: {
            files: fileProps.numFiles
        },
        fileFilter(req, file, callback) {
            if (fileProps.allowedMimes.includes(file.mimetype))
                callback(null, true);

            else
                callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
        }
    }
};

module.exports = multerConfig;

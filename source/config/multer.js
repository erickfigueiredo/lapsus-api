const path = require('path');
const { v4: uuidV4 } = require('uuid');

const multer = require('multer');

// Talvez mudar pra UUID
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

                file.key = uuidV4();
                file.key += `.${ext[1]}`;

                callback(null, file.key);
            }
        }),
        limits: {
            //files: fileProps.numFiles
        },
        fileFilter(req, file, callback) {
            console.log(file)
            if (fileProps.allowedMimes.includes(file.mimetype))
                callback(null, true);

            else
                callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
        }
    }
};

module.exports = multerConfig;

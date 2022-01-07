const path = require('path');
const { v4: uuidV4 } = require('uuid');

const multer = require('multer');

const multerConfig = (dir, fileProps) => {
    return {
        dest: path.resolve(__dirname, '..', '..', 'upload', dir),
        storage: multer.diskStorage({
            destination(req, file, callback) {
                callback(null, path.resolve(__dirname, '..', '..', 'upload', dir));
            },
            filename(req, file, callback) {
                const ext = file.mimetype.split('/');

                file.key = uuidV4();
                if (ext[1].includes('zip'))
                    file.key += '.zip';
                else
                    file.key += `.${ext[1]}`;

                callback(null, file.key);
            }
        }),
        limits: {
            files: fileProps.numFiles,
            fileSize: 1024 * 1024 * fileProps.maxSize
        },
        fileFilter(req, file, callback) {
            if (!fileProps.allowedMimes.includes(file.mimetype)) {
                callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
            } else {
                callback(null, true);
            }
        }
    }
};

module.exports = multerConfig;

const fs = require('fs');

const removeFiles = (files, checkFileExists = false) => {
    if (checkFileExists) {
        for (const file of files) {
            fs.stat(file.path, (err, stats) => {
                if (stats) fs.unlinkSync(`${file.path}`);
            });
        }
    } else {
        if (files) {
            for (const file of files) { fs.unlinkSync(`${file.path}`); }
        }
    }
}

module.exports = removeFiles;

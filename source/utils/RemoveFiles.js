const fs = require('fs');

const removeFiles = (files) => {
    if (files) { for (const file of files) { fs.unlinkSync(`${file.path}`); } }
}

module.exports = removeFiles;

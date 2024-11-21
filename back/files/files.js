const fs = require('fs');

const showImage = (path, callback) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

module.exports = showImage;
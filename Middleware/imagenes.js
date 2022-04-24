const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const filename = (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
};

const options = {
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(null, false);
    }
};

const imagenes = multer.diskStorage({
    destination: 'public/images',
    filename
});

uploadimagenes = multer({
    storage: imagenes,
    limits: options.limits,
    fileFilter: options.fileFilter
});

module.exports = {uploadimagenes};
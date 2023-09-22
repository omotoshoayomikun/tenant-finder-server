const multer = require('multer');

const ImageMulter = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, (+new Date * Math.random()).toString(36).substring(0, 10))
        }
    })
})

module.exports = ImageMulter;
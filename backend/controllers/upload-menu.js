/** load library multer */
const { request } = require('express')
const multer = require('multer')
/** config of storage */
const configStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, `./menu_image`)
    },
    filename: (request, file, callback) => {
        callback(null, `image-${Date.now()}-${file.originalname}`)
    }
})

/** define function upload */
const upload = multer({
    storage: configStorage,
    /** file filter */
    fileFilter: (request, file, callback) => {
        /** define accepted extension */
        const extension = [`image/jpg`, `image/png`, `image/jpeg`]

        /** check the extension */
        if (!extension.includes(file.mimetype)) {
            // refuse upload
            callback(true, false)
            return callback(null, `invalid type of file`)
        }

        /** filter size limit */
        /** define max size */
        const maxSize = (1 * 1924 * 1924)
        const fileSize = request.headers[`content-length`]

        if (fileSize > maxSize) {
            /** refuse upload  */
            callback(null, false)
            return callback(null, `file size is over`)
        }

        /** accespted */
        callback(null, true)
    }
})

/**export func */
module.exports = upload


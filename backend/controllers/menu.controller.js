/** load model of menu */
const menuModel = require('../models/index').menu
const joi = require('joi')
const { Op } = require('sequelize')

/** load upload function */
const upload = require(`./upload-menu`)

/** load path adn upload fs library */
const path = require(`path`)
const fs = require(`fs`)

/** create func to validate data menu */
const validateMenu = (input) => {
    /**define rules of menu */
    let rules = joi.object().keys({
        nama_menu: joi.string().required(),
        jenis: joi
            .string()
            .valid(`makanan`, `minuman`)
            .required(),
        deskripsi: joi.string().required(),
        harga: joi.number().required()
    })

    /** get error of validate */
    let { error } = rules.validate(input)
    if (error) {
        let message = error
            .details
            .map(item.message)
            .join(`,`)

        return {
            status: false,
            message: message
        }
    }
    return { status: true }
}

/** create and export function to add menu */
exports.addMenu = async (request, response) => {
    try {
        const uploadMenu = upload.single(`gambar`)
        uploadMenu(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }

            if (!request.file) {
                return response.json({
                    status: false,
                    message: `Nothing file to upload`
                })
            }

            /** check validation of input */
            let resultValidation = validateMenu(request.body)
            if (resultValidation.status == false) {
                return response.json({
                    status: false,
                    message: resultValidation.message
                })
            }

            /** slipping filename in request-body */
            request.body.gambar = request.file.filename

            /** insert menu using model */
            await menuModel.create(request.body)

            /** give a response */
            return response.json({
                status: true,
                message: `Data menu berhasil ditambahkan`
            })
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create and export func to get all menu*/
exports.getMneu = async (request, response) => {
    try {
        /** get all menu using model */
        let result = await menuModel.findAll()

        /** give a response */
        return response.json({
            status: true,
            data: result
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create and export func to filter/find menu */
exports.findMenu = async (request, response) => {
    try {
        let keyword = request.body.keyword
        let result = await menuModel.findAll({
            where: {
                [Op.or]: {
                    nama_menu: { [Op.substring]: keyword },
                    jenis: { [Op.substring]: keyword },
                    deskripsi: { [Op.substring]: keyword }
                }
            }
        })
        /** give a response */
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create func to update menu */
exports.updateMenu = async (request, response) => {
    try {
        const uploadMenu = upload.single(`gambar`)
        uploadMenu(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            /** get id menu that will be update */
            let id_menu = request.params.id_menu

            /** grab menu based on selected id menu */
            let selectedMenu = await menuModel
                .findOne({ where: { id_menu: id_menu } })

            /** check if update within upload `gambar` */
            if (request.file) {
                let oldFilename = selectedMenu.gambar
                /** create path of file */
                let pathFile = path.join(__dirname, `../menu_image`, oldFilename)

                /** delete te old file */
                if (fs.existsSync(pathFile)) {
                    /** delete old file */
                    fs.unlinkSync(pathFile, error => {
                        console.log(errror)
                    })
                }

                /** insert the file name to request body */
                request.body.gambar = request.file.filename
            }
            /** update menu using model */
            await menuModel.update(
                request.body,
                { where: { id_menu: id_menu } }
            )
            /** give a response */
            return response.json({
                status: true,
                message: `Data menu telah diupdate`
            })

        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create func delete menu  */
exports.deleteMenu = async (request, response) => {
    try {
        /** get id that will be delete */
        let id_menu = request.params.id_menu
        /** grab menu based on id */
        let selectedMenu = await menuModel
            .findOne({ where: { id_menu: id_menu } })

        /** define a path of file */
        let pathFile = path.join(__dirname,`../menu_image`,selectedMenu.gambar)

        /** check existing file  */
        if(fs.existsSync(pathFile)){
            /** delete file  */
            fs.unlinkSync(pathFile, error => {
                console.log(error);
            })
        }

        /** delete menu using model */
        await menuModel.destroy({
            where:{id_menu: id_menu}
        })

         /** give a response */
         return response.json({
            status: true,
            message: `Data menu telah dihapus`
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}








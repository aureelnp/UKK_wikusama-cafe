const express = require('express')
const app = express()

/** allow to read a request with json type */
app.use(express.json())

/** load a controller of meja */
const mejaController = require('../controllers/meja.controller')

/** call authorization method */
const { authorization } = require (`../controllers/auth.controller`)

/** route to get all data meja */
app.get('/meja', authorization(["admin", "manager"]), mejaController.getMeja)

/** route to get available meja */
app.get('/meja/available', authorization(["admin", "manager","kasir"]), mejaController.availableMeja)

/** route to add new meja */
app.post('/meja', authorization(["admin", "manager"]), mejaController.addMeja)

/** route to update meja */
app.put('/meja/:id_meja', authorization(["admin", "manager","kasir"]), mejaController.updateMeja)

/** route to delete meja */
app.delete('/meja/:id_meja', authorization(["admin", "manager"]), mejaController.deleteMeja)

module.exports = app


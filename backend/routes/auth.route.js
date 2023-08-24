const express = require('express')
const app = express()

/** allow to read a request with json type */
app.use(express.json())

/** memanggil authentication from controller */
const authController =
    require(`../controllers/auth.controller`)

/** create route for auth */
app.post(`/auth`, authController.authentication)

/**  */

module.exports = app
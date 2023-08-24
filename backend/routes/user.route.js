const express = require(`express`)
const app = express()

/** allow to read a request from body w/json format */
app.use(express.json())

/**load controller of menu */
const userController = require(`../controllers/user.controller`)

/** call authorization method */
const { authorization } = require (`../controllers/auth.controller`)

/** create route for get all user */
app.get(`/user`, authorization(["admin","manajer"]), userController.getUser)

/** create route for search user */
app.post(`/user/find`, authorization(["admin","manajer"]), userController.findUser)

/** create route for add user */
app.post(`/user`, authorization(["admin","manajer"]), userController.addUser)

/** create route for update user */
app.put(`/user/:id_user`, authorization(["admin","manajer"]), userController.updateUser)

/** create route for delete user */
app.delete(`/user/:id_user`,  authorization(["admin","manajer"]),userController.deleteUser)

/** export app */
module.exports = app
const express = require(`express`)
const app = express()

/**load controller of menu */
const menuController = require(`../controllers/menu.controller`)

/** call authorization method */
const { authorization } = require (`../controllers/auth.controller`)

/** create route for add menu */
app.post (`/menu`, authorization(["admin"]), menuController.addMenu)

/** create route for get all menu */
app.get(`/menu`, authorization(["admin"]), menuController.getMneu)

/** create route for search menu */
app.post (`/menu/find`, authorization(["admin"]), menuController.findMenu)

/** create route for edit menu */
app.put (`/menu/:id_menu`, authorization(["admin"]), menuController.updateMenu)

/** create route for delete menu */
app.delete(`/menu/:id_menu`,authorization(["admin"]), menuController.deleteMenu)

/** export app */
module.exports = app

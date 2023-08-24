const express = require(`express`)
const app = express()

/** allow to read a request from body w/json format */
app.use(express.json())

/**load controller of menu */
const transaksiController = require(`../controllers/transaksi.controller`)

/** call authorization method */
const { authorization } = require (`../controllers/auth.controller`)

/** create route to get all transkasi */
app.get(`/transaksi`, authorization(["kasir", "manajer"]), transaksiController.getTransaksi)

/** create route to add transaksi */
app.post(`/transaksi`, authorization(["kasir"]), transaksiController.addTransaksi)

/** create route to add transaksi */
app.put(`/transaksi/:id_transaksi`, authorization(["kasir"]), transaksiController.updateTransaksi)

/** create route to add transaksi */
app.delete(`/transaksi/:id_transaksi`, authorization(["kasir"]), transaksiController.deleteTransaksi)

/** export app */
module.exports = app
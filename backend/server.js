const express = require('express')
const app = express()
const cors = require (`cors`)
app.use(cors())

/** define port for the server */
const PORT = 8000

/** load a route of meja */
const mejaRoute = require ('./routes/meja.route')

/**load a route of menu */
const menuRoute = require(`./routes/menu.route`)

/**load a route of menu */
const userRoute = require(`./routes/user.route`)

/**load a route of menu */
const transaksiRoute = require(`./routes/transaksi.route`)

/**load a route of menu */
const authRoute = require(`./routes/auth.route`)

/** register route of mejA */
app.use(mejaRoute)

/** register route of menu */
app.use(menuRoute)

/** register route of menu */
app.use(userRoute)

/** register route of menu */
app.use(transaksiRoute)

/** register route of menu */
app.use(authRoute)

app.use(express.static(__dirname))

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const usuariosRoutes = require('./routes/usuarios-routes')
const ticketRoutes = require('./routes/ticket-routes')
const maquinaRoutes = require('./routes/maquina-routes')
const googleRoutes = require('./routes/google-routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`)
    next()
})

app.use('/ticket', ticketRoutes)

app.use('/usuarios', usuariosRoutes)

app.use('/maquina', maquinaRoutes)

app.use('/', googleRoutes)

app.listen(3001, () => {
    console.log('Servidor en http://localhost:3001')
})



const express = require('express')
const cors = require('cors')
const usuariosRoutes = require('./routes/usuarios-routes')
const ticketRoutes = require('./routes/ticket-routes')

console.log('Router de usuarios cargado:', usuariosRoutes)
console.log('Router de tickets cargado:', ticketRoutes)

const app = express()
app.use(cors())

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`)
    next()
})

app.use('/ticket', ticketRoutes)

app.use('/usuarios', usuariosRoutes)

app.listen(3001, () => {
    console.log('Servidor en http://localhost:3001')
})

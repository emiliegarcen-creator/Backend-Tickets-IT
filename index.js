const express = require('express')
const cors = require('cors')
const usuariosRoutes = require('./routes/usuarios-routes')

console.log('Router de usuarios cargado:', usuariosRoutes)

const app = express()
app.use(cors())

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`)
    next()
})

const ticket = [
    {id: 1, modelo: 'Acer', descripcion: 'no prende', cargador: 'si', nrolocker: 123},
    {id: 2, modelo: 'Dell', descripcion: 'no carga', cargador: 'no', nrolocker: 45},
    {id: 3, modelo: 'HP', descripcion: 'tiene rota la visagra', cargador: 'si', nrolocker: 67},
]

app.get('/ticket', (req, res) =>{
    console.log('Ruta ticket ejecutada')
    res.json(ticket)
})

app.use('/usuarios', usuariosRoutes)

app.listen(3001, () => {
    console.log('Servidor en http://localhost:3001')
})

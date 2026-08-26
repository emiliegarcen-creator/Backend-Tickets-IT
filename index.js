const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const productos = [
    {id: 1, nombre: 'Remera', precio: 1500},
    {id: 2, nombre: 'Pantalon', precio: 3000},
    {id: 3, nombre: 'Zapatos', precio: 2500},
]

app.get('/productos', (req, res) =>{
    res.json(productos)
})

app.listen(3001, () => {
    console.log('Servidor en http://localhost.3001')
})
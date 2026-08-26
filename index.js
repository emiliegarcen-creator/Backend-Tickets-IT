const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const ticket = [
    {id: 1, modelo: 'Acer', descripcion: 'no prende', cargador: 'si', nrolocker: 123},
    {id: 2, modelo: 'Dell', descripcion: 'no carga', cargador: 'no', nrolocker: 45},
    {id: 3, modelo: 'HP', descripcion: 'tiene rota la visagra', cargador: 'si', nrolocker: 67},
]

app.get('/ticket', (req, res) =>{
    console.log('Ruta ticket ejecutada')
    res.json(ticket)
})

app.listen(3001, () => {
    console.log('Servidor en http://localhost:3001')
})

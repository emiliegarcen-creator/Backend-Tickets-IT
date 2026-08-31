const express = require('express')
const router = express.Router()
const controller = require('../controllers/ticket-controllers')

router.get('/', controller.listarTickets)
router.get('/:id', controller.obtenerTickets)
router.get('/:id/maquina', controller.obtenerMaquinaDeTicket)
router.post('/', controller.crearTicket)
router.patch('/:id', controller.actualizarPrioridad)
router.delete('/:id', controller.eliminarTicket)

module.exports = router

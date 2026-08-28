const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuarios-controllers')
const ticketController = require('../controllers/ticket-controllers')

router.get('/', controller.listarUsuarios)
router.get('/:ci', controller.obtenerUsuario)
router.get('/:id/ticket', ticketController.listarTicketsPorUsuario)
router.post('/:id/ticket', ticketController.crearTicket)

module.exports = router

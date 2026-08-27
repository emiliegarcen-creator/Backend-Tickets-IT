const express = require('express')
const router = express.Router()
const controller =
require('../controllers/ticket-controllers')

router.get('/', controller.listarTickets)
router.get('/:id', controller.obtenerTickets)

module.exports = router
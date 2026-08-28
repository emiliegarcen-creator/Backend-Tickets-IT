const express = require('express')
const router = express.Router()
const controller =
require('../controllers/maquina-controllers')

router.get('/', controller.listarMaquinas)
router.get('/:id', controller.obtenerMaquinas)

module.exports = router
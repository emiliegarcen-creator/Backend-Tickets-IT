const express = require('express')
const router = express.Router()
const controller =
require('../controllers/usuarios-controllers')

router.get('/', controller.listarUsuarios)
router.get('/:ci', controller.obtenerUsuario)

module.exports = router
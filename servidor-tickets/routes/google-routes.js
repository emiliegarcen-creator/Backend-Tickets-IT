const express = require('express')
const router = express.Router()
const googleController = require('../controllers/google-controllers')


router.get('/auth/google/:ci', googleController.IniciarAutenticacion)
router.get('/google/callback', googleController.callbackGoogle)
router.post('/google/evento/:ci', googleController.crearEventoCalendar)

module.exports = router
const { google } = require('googleapis')
const { oauth2Client, SCOPES } = require('../data/googleCalendar')
const usuarioModelo = require('../modelos/usuarioModelo')

async function IniciarAutenticacion(req, res) {
    try {
        const ci = Number(req.params.ci)
        if (Number.isNaN(ci)) {
            return res.status(400).json({ error: 'La cédula debe ser un número' })
        }

        const usuario = await usuarioModelo.buscarUsuario(ci)
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
            prompt: 'consent',
            state: String(ci)
        })

        res.redirect(url)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al iniciar la autenticación con Google' })
    }
}

async function callbackGoogle(req, res) {
    try {
        const { code, state } = req.query
        const ci = Number(state)

        const { tokens } = await oauth2Client.getToken(code)

        if (tokens.refresh_token) {
            await usuarioModelo.guardarRefreshToken(ci, tokens.refresh_token)
        }

        res.send('Google Calendar conectado exitosamente. Puedes cerrar esta pestaña.')
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al procesar la autenticación de Google' })
    }
}

async function crearEventoCalendar(req, res) {
    try {
        const ci = Number(req.params.ci)
        if (Number.isNaN(ci)) {
            return res.status(400).json({ error: 'La cédula debe ser un número' })
        }

        const usuario = await usuarioModelo.buscarUsuario(ci)
        if (!usuario || !usuario.googleRefreshToken) {
            return res.status(400).json({ error: 'El usuario no ha vinculado Google Calendar' })
        }

        const { titulo, descripcion, fechaInicio, fechaFin } = req.body
        if (!titulo || !fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Faltan campos obligatorios (titulo, fechaInicio, fechaFin)' })
        }

        oauth2Client.setCredentials({
            refresh_token: usuario.googleRefreshToken
        })

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

        const evento = await calendar.events.insert({
            calendarId: 'primary',
            resource: {
                summary: titulo,
                description: descripcion || '',
                start: { dateTime: new Date(fechaInicio).toISOString() },
                end: { dateTime: new Date(fechaFin).toISOString() }
            }
        })

        res.status(201).json({
            mensaje: 'Evento creado exitosamente',
            link: evento.data.htmlLink
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear el evento en Google Calendar' })
    }
}

module.exports = {
    IniciarAutenticacion,
    callbackGoogle,
    crearEventoCalendar
}
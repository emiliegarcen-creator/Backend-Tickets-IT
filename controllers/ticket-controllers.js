const data = require('../data/ticket-data')
const usuariosData = require('../data/usuarios-data')

function listarTickets(req, res) {
    res.json(data.ticket)
}

function obtenerTickets(req, res) {
    const { id } = req.params
    const u = data.ticket.find(x => x.id == id)
    if (!u) return res.status(404).json({error: 'Ticket no encontrado'})
    res.json(u)
}

function actualizarPrioridad(req, res) {
    const { id } = req.params
    const { prioridad } = req.body

    const ticketExistente = data.ticket.find(t => t.id == id)
    if (!ticketExistente) {
        return res.status(404).json({ error: 'Ticket no encontrado' })
    }

    if (!prioridad) {
        return res.status(400).json({ error: 'Falta el campo prioridad' })
    }

    ticketExistente.prioridad = prioridad
    res.json(ticketExistente)
}

function crearTicket(req, res) {
    const { id } = req.params
    const { modelo, descripcion, cargador, nrolocker } = req.body

    const usuarioExiste = usuariosData.usuarios.find(u => u.ci == id)
    if (!usuarioExiste) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    if (!modelo || !descripcion || !cargador || !nrolocker) {
        return res.status(400).json({ error: 'Faltan datos obligatorios (modelo, descripcion, cargador, nrolocker)' })
    }

    const nuevoId = data.ticket.length > 0
        ? Math.max(...data.ticket.map(t => t.id)) + 1
        : 1

    const nuevoTicket = {
        id: nuevoId,
        modelo,
        descripcion,
        cargador,
        nrolocker,
        prioridad: 'Media',
        ci: id
    }

    data.ticket.push(nuevoTicket)
    res.status(201).json(nuevoTicket)
}

function eliminarTicket(req, res) {
    const { id } = req.params
    const index = data.ticket.findIndex(t => t.id == id)

    if (index === -1) {
        return res.status(404).json({ error: 'Ticket no encontrado' })
    }

    const eliminado = data.ticket.splice(index, 1)
    res.json({ mensaje: 'Ticket eliminado', ticket: eliminado[0] })
}

function listarTicketsPorUsuario(req, res) {
    const { id } = req.params
    const ticketsDelUsuario = data.ticket.filter(t => t.ci == id)
    res.json(ticketsDelUsuario)
}

module.exports = { listarTickets, obtenerTickets, actualizarPrioridad, crearTicket, eliminarTicket, listarTicketsPorUsuario }

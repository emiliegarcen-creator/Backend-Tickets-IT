const data = require('../data/ticket-data')
const usuariosData = require('../data/usuarios-data')
const maquinaData = require('../data/maquina-data')

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
    const { descripcion, nrolocker, maquina } = req.body

    const usuarioExiste = usuariosData.usuarios.find(u => u.ci == id)
    if (!usuarioExiste) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    if (!descripcion || !nrolocker || !maquina) {
        return res.status(400).json({ error: 'Faltan datos obligatorios (descripcion, nrolocker, maquina)' })
    }

    const maquinaExiste = maquinaData.maquina.find(m => m.id == maquina)
    if (!maquinaExiste) {
        return res.status(404).json({ error: 'Máquina no encontrada' })
    }

    const nuevoId = data.ticket.length > 0
        ? Math.max(...data.ticket.map(t => t.id)) + 1
        : 1

    const nuevoTicket = {
        id: nuevoId,
        descripcion,
        nrolocker,
        prioridad: 'Media',
        ci: id,
        maquina
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

     const usuarioExiste = usuariosData.usuarios.find(u => u.ci == id)
    if (!usuarioExiste) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    
    const ticketsDelUsuario = data.ticket.filter(t => t.ci == id)
    res.json(ticketsDelUsuario)
}

function listarTicketsMaquina(req, res) {
    const { id } = req.params
    const ticketsDeLaMaquina = data.ticket.filter(t => t.ci == id)
    res.json(ticketsDelUsuario)
}

function obtenerMaquinaDeTicket(req, res) {
    const { id } = req.params

    const ticketExistente = data.ticket.find(t => t.id == id)
    if (!ticketExistente) {
        return res.status(404).json({ error: 'Ticket no encontrado' })
    }

    const maquinaDelTicket = maquinaData.maquina.find(m => m.id == ticketExistente.maquina)
    if (!maquinaDelTicket) {
        return res.status(404).json({ error: 'Máquina no encontrada' })
    }

    res.json(maquinaDelTicket)
}

module.exports = { 
    listarTickets,
    obtenerTickets,
    actualizarPrioridad,
    crearTicket, 
    eliminarTicket, 
    listarTicketsPorUsuario,
    obtenerMaquinaDeTicket
}

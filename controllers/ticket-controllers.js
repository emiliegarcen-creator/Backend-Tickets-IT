const data = require('../data/ticket-data')

function listarTickets(req, res) {
    res.json(data.ticket)
}

function obtenerTickets(req, res) {
    const { id } = req.params
    const u = data.ticket.find(x => x.id == id)
    if (!u) return res.status(404).json({error: 'Ticket no encontrado'})
    res.json(u)
}

module.exports = { listarTickets, obtenerTickets }
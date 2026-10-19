const prisma = require('../db')

async function listarTickets() {
    return await prisma.ticket.findMany()
}

async function buscarTicket(id) {
    return await prisma.ticket.findUnique({ where: { ID_ticket: id } })
}

async function actualizarPrioridad(id, prioridad) {
    return await prisma.ticket.update({
        where: { ID_ticket: id },
        data: { prioridad }
    })
}

async function crearTicket({ descripcion, nrolocker, ci_usuario, ID_maquina }) {
    return await prisma.ticket.create({
        data: { descripcion, nrolocker, ci_usuario, ID_maquina, prioridad: 'Media' }
    })
}

async function eliminarTicket(id) {
    return await prisma.ticket.delete({ where: { ID_ticket: id } })
}

async function listarPorUsuario(ci) {
    return await prisma.ticket.findMany({ where: { ci_usuario: ci } })
}

async function listarPorMaquina(idMaquina) {
    return await prisma.ticket.findMany({ where: { ID_maquina: idMaquina } })
}

async function buscarTicketConMaquina(id) {
    return await prisma.ticket.findUnique({
        where: { ID_ticket: id },
        include: { Maquina: true }
    })
}

module.exports = {
    listarTickets,
    buscarTicket,
    actualizarPrioridad,
    crearTicket,
    eliminarTicket,
    listarPorUsuario,
    listarPorMaquina,
    buscarTicketConMaquina
}
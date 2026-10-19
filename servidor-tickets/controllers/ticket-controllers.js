const modelo = require('../modelos/ticketModelo')
const usuarioModelo = require('../modelos/usuarioModelo')
const maquinaModelo = require('../modelos/maquinaModelo')

const PRIORIDADES = ['Alta', 'Media', 'Baja']

async function listarTickets(req, res) {
    try {
        res.json(await modelo.listarTickets())
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al listar tickets' })
    }
}

async function obtenerTickets(req, res) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número' })
        }
        const t = await modelo.buscarTicket(id)
        if (!t) return res.status(404).json({ error: 'Ticket no encontrado' })
        res.json(t)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al buscar el ticket' })
    }
}

async function actualizarPrioridad(req, res) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número' })
        }

        const { prioridad } = req.body
        if (!prioridad) {
            return res.status(400).json({ error: 'Falta el campo prioridad' })
        }
        if (!PRIORIDADES.includes(prioridad)) {
            return res.status(400).json({ error: `prioridad debe ser una de: ${PRIORIDADES.join(', ')}` })
        }

        res.json(await modelo.actualizarPrioridad(id, prioridad))
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Ticket no encontrado' })
        }
        console.error(error)
        res.status(500).json({ error: 'Error al actualizar la prioridad' })
    }
}

async function crearTicket(req, res) {
    try {
        const ci = Number(req.params.id)
        if (Number.isNaN(ci)) {
            return res.status(400).json({ error: 'La cédula debe ser un número' })
        }

        const { descripcion, nrolocker, maquina } = req.body
        if (!descripcion || !nrolocker || !maquina) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (descripcion, nrolocker, maquina)' })
        }

        const nroLocker = Number(nrolocker)
        const idMaquina = Number(maquina)
        if (Number.isNaN(nroLocker) || Number.isNaN(idMaquina)) {
            return res.status(400).json({ error: 'nrolocker y maquina deben ser números' })
        }

        const usuario = await usuarioModelo.buscarUsuario(ci)
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        const maquinaExiste = await maquinaModelo.buscarMaquina(idMaquina)
        if (!maquinaExiste) {
            return res.status(404).json({ error: 'Máquina no encontrada' })
        }

        const nuevo = await modelo.crearTicket({
            descripcion,
            nrolocker: nroLocker,
            ci_usuario: ci,
            ID_maquina: idMaquina
        })
        res.status(201).json(nuevo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear el ticket' })
    }
}

async function eliminarTicket(req, res) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número' })
        }
        const eliminado = await modelo.eliminarTicket(id)
        res.json({ mensaje: 'Ticket eliminado', ticket: eliminado })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Ticket no encontrado' })
        }
        console.error(error)
        res.status(500).json({ error: 'Error al eliminar el ticket' })
    }
}

async function listarTicketsPorUsuario(req, res) {
    try {
        const ci = Number(req.params.id)
        if (Number.isNaN(ci)) {
            return res.status(400).json({ error: 'La cédula debe ser un número' })
        }

        const usuario = await usuarioModelo.buscarUsuario(ci)
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        res.json(await modelo.listarPorUsuario(ci))
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al listar los tickets del usuario' })
    }
}

async function listarTicketsMaquina(req, res) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número' })
        }

        const maquina = await maquinaModelo.buscarMaquina(id)
        if (!maquina) {
            return res.status(404).json({ error: 'Máquina no encontrada' })
        }

        res.json(await modelo.listarPorMaquina(id))
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al listar los tickets de la máquina' })
    }
}

async function obtenerMaquinaDeTicket(req, res) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número' })
        }

        const t = await modelo.buscarTicketConMaquina(id)
        if (!t) {
            return res.status(404).json({ error: 'Ticket no encontrado' })
        }
        if (!t.Maquina) {
            return res.status(404).json({ error: 'Máquina no encontrada' })
        }

        res.json(t.Maquina)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al buscar la máquina del ticket' })
    }
}

module.exports = {
    listarTickets,
    obtenerTickets,
    actualizarPrioridad,
    crearTicket,
    eliminarTicket,
    listarTicketsPorUsuario,
    listarTicketsMaquina,
    obtenerMaquinaDeTicket
}
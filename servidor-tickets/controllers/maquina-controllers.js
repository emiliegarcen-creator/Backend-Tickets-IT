const modelo = require('../modelos/maquinaModelo')

const SITUACIONES = ['ConDueno', 'SinUso', 'Prestamo']
const CARGADORES = ['SiTiene', 'NoTiene']

async function listarMaquinas(req, res) {
    try {
        res.json(await modelo.listarMaquinas())
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al listar máquinas' })
    }
}

async function obtenerMaquinas(req, res) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número' })
        }
        const m = await modelo.buscarMaquina(id)
        if (!m) return res.status(404).json({ error: 'Maquina no encontrada' })
        res.json(m)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al buscar la máquina' })
    }
}

async function actualizarMaquina(req, res) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'El id debe ser un número' })
        }

        const { situacion, cargador, ci_dueno } = req.body

        if (situacion === undefined && cargador === undefined && ci_dueno === undefined) {
            return res.status(400).json({ error: 'Mandá al menos un campo: situacion, cargador o ci_dueno' })
        }
        if (situacion !== undefined && !SITUACIONES.includes(situacion)) {
            return res.status(400).json({ error: `situacion debe ser una de: ${SITUACIONES.join(', ')}` })
        }
        if (cargador !== undefined && !CARGADORES.includes(cargador)) {
            return res.status(400).json({ error: `cargador debe ser uno de: ${CARGADORES.join(', ')}` })
        }
        if (situacion === 'ConDueno' && (ci_dueno === undefined || ci_dueno === null)) {
            return res.status(400).json({ error: 'Una máquina ConDueno necesita ci_dueno' })
        }

        const actualizada = await modelo.actualizarMaquina(id, {
            situacion,
            cargador,
            ci_dueno: ci_dueno === undefined || ci_dueno === null ? ci_dueno : Number(ci_dueno)
        })
        res.json(actualizada)
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Máquina no encontrada' })
        }
        if (error.code === 'P2003') {
            return res.status(400).json({ error: 'El usuario dueño (ci_dueno) no existe' })
        }
        console.error(error)
        res.status(500).json({ error: 'Error al actualizar la máquina' })
    }
}

module.exports = { listarMaquinas, obtenerMaquinas, actualizarMaquina }
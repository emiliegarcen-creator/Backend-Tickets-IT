const data = require('../data/maquina-data')

function listarMaquinas(req, res) {
    res.json(data.maquina)
}

function obtenerMaquinas(req, res) {
    const { id } = req.params
    const u = data.maquina.find(x => x.id == id)
    if (!u) return res.status(404).json({error: 'Maquina no encontrado'})
    res.json(u)
}

function actualizarMaquina(req, res) {
    const { id } = req.params
    const { situacion, dueno, cargador } = req.body

    const maquinaExistente = data.maquina.find(m => m.id == id)
    if (!maquinaExistente) {
        return res.status(404).json({ error: 'Máquina no encontrada' })
    }

    if (!situacion || !dueno || !cargador) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios (situacion, dueno, cargador)' })
    }

    maquinaExistente.situacion = situacion
    maquinaExistente.dueno = dueno
    maquinaExistente.cargador = cargador

    res.json(maquinaExistente)
}

module.exports = { listarMaquinas, obtenerMaquinas, actualizarMaquina }

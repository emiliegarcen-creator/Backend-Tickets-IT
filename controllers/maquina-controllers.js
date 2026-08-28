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

module.exports = { listarMaquinas, obtenerMaquinas }
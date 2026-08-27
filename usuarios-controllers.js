const data = require('../data/usuarios-data')

function listarUsuarios(req, res) {
    res.json(data.usuarios)
}

function obtenerUsuario(req, res) {
    const { ci } = req.params
    const u = data.usuarios.find(x => x.ci == ci)
    if (!u) return res.status(404).json({error: 'Usuario no encontrado'})
    res.json(u)
}

module.exports = { listarUsuarios, obtenerUsuario }
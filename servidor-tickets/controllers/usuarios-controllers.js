const modelo = require('../modelos/usuarioModelo')

async function listarUsuarios(req, res) {
    try {
        const usuarios = await modelo.listarUsuarios()
        res.json(usuarios)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al listar usuarios' })
    }
}

async function obtenerUsuario(req, res) {
    try {
        const ci = Number(req.params.ci)
        if (Number.isNaN(ci)) {
            return res.status(400).json({ error: 'La cédula debe ser un número' })
        }
        const u = await modelo.buscarUsuario(ci)
        if (!u) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json(u)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al buscar el usuario' })
    }
}

module.exports = { listarUsuarios, obtenerUsuario }
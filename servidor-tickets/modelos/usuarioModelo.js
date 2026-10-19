const prisma = require('../db')

async function listarUsuarios() {
    return await prisma.usuario.findMany({
        omit: { contrasena: true }
    })
}

async function buscarUsuario(ci) {
    return await prisma.usuario.findUnique({
        where: { ci },
        omit: { contrasena: true }
    })
}

async function guardarRefreshToken(ci, token) {
    return await prisma.usuario.update({
        where: { ci: Number(ci) },
        data: { googleRefreshToken: token }
    })
}

module.exports = { listarUsuarios, buscarUsuario, guardarRefreshToken }
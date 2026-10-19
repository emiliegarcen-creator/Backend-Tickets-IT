const prisma = require('../db')

const incluirDueno = { Usuario: { select: { nombre: true } } }

async function listarMaquinas() {
    return await prisma.maquina.findMany({ include: incluirDueno })
}

async function buscarMaquina(id) {
    return await prisma.maquina.findUnique({
        where: { ID: id },
        include: incluirDueno
    })
}

async function actualizarMaquina(id, { situacion, cargador, ci_dueno }) {
    return await prisma.maquina.update({
        where: { ID: id },
        data: { situacion, cargador, ci_dueno },
        include: incluirDueno
    })
}

module.exports = { listarMaquinas, buscarMaquina, actualizarMaquina }
//Obtener todos los tickets: 
GET /tickets
// Obtener un ticket específico: 
GET /tickets/{id}
// Crear un nuevo ticket: 
POST /tickets
// Actualizar un ticket existente: 
PUT /tickets/{id}
// Actualizar información de un ticket existente: 
PATCH /tickets/{id}
// Eliminar un ticket: 
DELETE /tickets/{id}
// Obtener los tickets creados por un cliente específico: 
GET /clientes/{id}/tickets
// Crear un nuevo ticket para un cliente específico: 
POST /clientes/{id}/tickets

// Obtener la máquina asociada a un ticket: 
GET /tickets/{id}/maquina
// Obtener los tickets asignados a un técnico específico: 
GET /soporte/{id}/tickets
// Asignar un ticket a un técnico: 
PUT /tickets/{id}/soporte
// Obtener los clientes asignados a un técnico específico: 
GET /soporte/{id}/clientes
// Obtener la máquina de un cliente específico: 
GET /clientes/{id}/maquina
// Actualizar la máquina de un cliente específico: 
PUT /clientes/{id}/maquina

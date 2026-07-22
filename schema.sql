CREATE TABLE Cliente (
  ci_cliente INT(8) PRIMARY KEY,
  nombre_compelto VARCHAR(50),
  orientacion VARCHAR(10),
  rol VARCHAR(10)
 );
 
 CREATE TABLE Maquina (
   ID INT AUTO_INCREMENT PRIMARY KEY,
   ci_cliente INT(8),
   FOREIGN KEY (ci_cliente)
   REFERENCES Cliente(ci_cliente)
  );
 
  CREATE TABLE Soporte (
    ci_soporte PRIMARY KEY,
    nombre_completoIT VARCHAR(50),
    rol VARCHAR (10)
   );
   
   CREATE TABLE Ticket (
     ID_ticket INT AUTO_INCREMENT PRIMARY KEY,
     prioridad,
     descripcion,
     ci_soporte,
     FOREIGN KEY (ci_soporte)
     REFERENCES Soporte(ci_soporte)
    );
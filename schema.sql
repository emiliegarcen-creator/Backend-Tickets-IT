CREATE TABLE Usuario (
  ci INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  rol SET('Soporte', 'Funcionario', 'Estudiante') NOT NULL,
  mail VARCHAR(100) NOT NULL,
  contrasena VARCHAR(25) NOT NULL
);

CREATE TABLE Maquina (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  modelo VARCHAR(50) NOT NULL,
  situacion SET('ConDueno', 'SinUso', 'Prestamo') NOT NULL,
  cargador SET('SiTiene', 'NoTiene'),
  ci_dueno INT NULL,
  FOREIGN KEY (ci_dueno) REFERENCES Usuario(ci)
);

CREATE TABLE Ticket (
  ID_ticket INT AUTO_INCREMENT PRIMARY KEY,
  prioridad SET('Alta', 'Media', 'Baja') NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  ci_usuario INT NOT NULL,
  nrolocker INT NOT NULL,
  ID_maquina INT,
  FOREIGN KEY (ci_usuario) REFERENCES Usuario(ci),
  FOREIGN KEY (ID_maquina) REFERENCES Maquina(ID)
);
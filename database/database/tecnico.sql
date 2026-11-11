
CREATE DATABASE IF NOT EXISTS tecnico;
USE tecnico;

CREATE TABLE IF NOT EXISTS cliente (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS tecnico (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS servicio (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT(11) NOT NULL,
    tecnico_id INT(11) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO cliente (id, nombre, telefono, correo) VALUES 
(1, 'Juan Perez', '5512345678', 'juan@test.com');

INSERT INTO tecnico (id, nombre, especialidad) VALUES 
(3, 'Carlos Lopez', 'Soporte Tecnico'),
(4, 'Cecia', 'Soporte Tecnico');

INSERT INTO servicio (id, cliente_id, tecnico_id, descripcion, estado, fecha) VALUES 
(5, 1, 3, 'prueba', 'Terminado', ''2026-11-10'');

INSERT INTO usuario (id, username, password) VALUES 
(1, 'admin', '12345'),
(2, 'alumno', '2026');

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS base;

-- Seleccionar la base de datos
USE base;

-- Crear la tabla `users`
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- ID único del usuario
    name VARCHAR(100) NOT NULL,               -- Nombre del usuario
    email VARCHAR(100) NOT NULL UNIQUE,       -- Correo electrónico único
    password VARCHAR(255) NOT NULL,           -- Contraseña del usuario
    phone VARCHAR(15) DEFAULT NULL,           -- Teléfono (opcional)
    address TEXT DEFAULT NULL,                -- Dirección del usuario
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Última actualización
);


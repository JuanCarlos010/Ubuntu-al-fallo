-- =====================================================================
--  init.sql  |  Base de datos del proyecto Foodin Line
--  Docker ejecuta este archivo UNA sola vez, cuando el volumen esta vacio.
--  Version corregida del "script db" original:
--    * Tablas en minuscula (en Linux MySQL distingue mayusculas/minusculas
--      y el backend consulta users, restaurant y menu en minuscula)
--    * price DECIMAL(6,2)  (DECIMAL a secas redondea 17.99 a 18)
--    * Se quito el comentario "--numero" sin espacio (daba error de sintaxis)
--    * Se quitaron los INSERT duplicados y el DROP TABLE users
--    * Se agrego el menu de Go Green (idRestaurant = 10)
-- =====================================================================

CREATE DATABASE IF NOT EXISTS DBFoodin_line
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE DBFoodin_line;
SET NAMES utf8mb4;

-- ---------------------------------------------------------------------
-- Tablas
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(40),
    password VARCHAR(10)
);

CREATE TABLE restaurant (
    idRestaurant INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    section VARCHAR(20),
    phone INT,                -- numero telefonico
    adress VARCHAR(60),
    logo VARCHAR(50)
);

CREATE TABLE menu (
    idMenu INT PRIMARY KEY AUTO_INCREMENT,
    item VARCHAR(40),
    price DECIMAL(6,2),
    idRestaurant INT,
    FOREIGN KEY (idRestaurant) REFERENCES restaurant(idRestaurant)
);

-- ---------------------------------------------------------------------
-- Restaurantes (ids 1 a 10, en este orden)
-- ---------------------------------------------------------------------
INSERT INTO restaurant (name, section, phone, adress, logo) VALUES
('Papa Johns',   'Comida rápida', 22733333, 'Col.La Sultana, Antiguo Cuscatlan', 'papa_johns.png'),
('Zepped',       'Comida rápida', 73403353, 'Entrada UCA peatonal', 'Zepped.png'),
('Wendys',       'Comida rápida', 21212222, 'Blvr. Los Proceres, San Salvador', 'wendys.png'),
('Starbucks',    'Bebidas',       22240044, 'Paralela Blvr. Los Proceres', 'starbucks.png'),
('Bobaluba',     'Bebidas',       77708370, 'Carretera Panamericana, kilómetro 10 Ciudad Merliot', 'bobaluba.png'),
('San Martín',   'Postres',       22135852, 'Blvr. Sta. Elena', 'san_martin.png'),
('Ban Ban',      'Postres',       22794168, 'Centro Comercial Galerías, San Salvador', 'ban_ban.png'),
('Olive Garden', 'Saludable',     22431177, 'Carretera Panamericana Centro Comercial La Gran Via', 'olive_garden.png'),
('Subway',       'Saludable',     22676206, 'Calle Mediterraneo, Local 1 Col. La Sultana', 'subway.png'),
('Go Green',     'Saludable',     22435975, 'Centro Comercial Multipaza, Cd Merliot', 'go_green.png');

-- ---------------------------------------------------------------------
-- Menu de cada restaurante
-- ---------------------------------------------------------------------
INSERT INTO menu (item, price, idRestaurant) VALUES
-- 1 Papa Johns
('Pizza Carnivora', 17.99, 1),
('Garlic Knots', 3.95, 1),
('Hawaiana', 16.99, 1),
-- 2 Zepped
('Econo-dog', 1.25, 2),
('Ultra Cheese-dog', 1.75, 2),
('Ultra Chilli-dog', 1.75, 2),
-- 3 Wendys
('Limonada Wildberry', 3.50, 3),
('Baconator Individual', 8.75, 3),
('Melt Individual', 7.75, 3),
-- 4 Starbucks
('Green Tea Latte', 5.50, 4),
('Baguette Española', 6.95, 4),
('Caramel Macchiatto', 5.99, 4),
-- 5 Bobaluba
('Black Milk Tea', 4.25, 5),
('Hibiscus Tea', 2.95, 5),
('Taro Enamorado', 4.95, 5),
-- 6 San Martin
('Pastel De Chocolate Mediano', 17.00, 6),
('Coffee Cake Navideño', 9.15, 6),
('Rosca Vienesa', 6.25, 6),
-- 7 Ban Ban
('Fruta mediana', 18.50, 7),
('Crepa De Nutella Y Banano', 4.50, 7),
('Semita Alta', 3.25, 7),
-- 8 Olive Garden
('Zuppe Toscana', 7.50, 8),
('Sirloin With Fettuccine Alfredo', 18.95, 8),
('Chicken Alfredo', 16.99, 8),
-- 9 Subway
('Pollo Pesto', 5.25, 9),
('BMT Supremo', 5.75, 9),
('Galleta Choco Chip', 0.80, 9),
-- 10 Go Green
('Tokio', 4.45, 10),
('Go Tijuana', 4.85, 10),
('IGO Buffalo', 4.65, 10);

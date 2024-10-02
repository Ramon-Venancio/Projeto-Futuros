DROP DATABASE projetocheck;

CREATE DATABASE projetocheck;

USE projetocheck;

CREATE TABLE carros (
id INT AUTO_INCREMENT PRIMARY KEY,
placa VARCHAR(7) NOT NULL,
modelo VARCHAR(50) NOT NULL,
marca VARCHAR(50) NOT NULL,
ano VARCHAR(9) NOT NULL);

INSERT INTO	carros (placa, modelo, marca, ano)
VALUES 
('ABC1234','Corolla','Toyota', '2018/2019');

SELECT * FROM carros;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    );


INSERT INTO usuarios (username, password) 
VALUES
('Jonas', '2306'),
('Levy', '1234'),
('Ramon', '2345');

CREATE TABLE avarias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    localizacao VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO avarias (localizacao, descricao, imagem) 
VALUES
('Frente', 'Risco na pintura', 'C:\\xampp\\htdocs\\uploads\\exemplo1.jpg'),
('Lateral Direita', 'Amassado', 'C:\\xampp\\htdocs\\uploads\\exemplo2.jpg'),
('Traseira', 'Farol quebrado', NULL);

ALTER TABLE avarias ADD COLUMN placa VARCHAR(7) NOT NULL;

DESCRIBE CARROS;
DESCRIBE USUARIOS;
DESCRIBE AVARIAS;

CREATE TABLE checklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) NOT NULL,
    parte VARCHAR(100) NOT NULL,
    status ENUM('OK', 'Não OK') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
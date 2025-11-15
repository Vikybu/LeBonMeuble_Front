-- @block
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE material (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE color (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

   -- @block
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(100) NOT NULL,
    total_amount INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES user(id)
);

   -- @block
CREATE TABLE furniture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    status VARCHAR(100) NOT NULL,
    width INT,
    height INT,
    length INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES user(id),
    type_id INT NOT NULL, 
    FOREIGN KEY (type_id) REFERENCES type(id),
    material_id INT NOT NULL, 
    FOREIGN KEY (material_id) REFERENCES material(id),
    color_id INT NOT NULL, 
    FOREIGN KEY (color_id) REFERENCES color(id),
    image_id INT NOT NULL, 
    FOREIGN KEY (image_id) REFERENCES image(id),
    orders_id INT NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders(id)
);

-- @block
INSERT INTO user (firstname, lastname, email, password, role, created_at, updated_at)
VALUES ('Lauréline', 'Fleury', 'l.fleury@test.fr', 'admin', 'test1234', '2025-11-06', '2025-11-06')

-- @block
INSERT INTO material (name, created_at, updated_at)
VALUES 
('Bois', '2025-11-12', '2025-11-12'),
('Plastique', '2025-11-12', '2025-11-12'),
('Chêne', '2025-11-12', '2025-11-12'),
('Bouleau', '2025-11-12', '2025-11-12'),
('Hêtre', '2025-11-12', '2025-11-12')

-- @block
INSERT INTO color (name, created_at, updated_at)
VALUES 
('Blanc', '2025-11-12', '2025-11-12'),
('Bleu', '2025-11-12', '2025-11-12'),
('Vert', '2025-11-12', '2025-11-12'),
('Rouge', '2025-11-12', '2025-11-12'),
('Noir', '2025-11-12', '2025-11-12'),
('Marron', '2025-11-12', '2025-11-12'),
('Gris', '2025-11-12', '2025-11-12'),
('Jaune', '2025-11-12', '2025-11-12'),
('Beige', '2025-11-12', '2025-11-12')

-- @block
INSERT INTO type (name, created_at, updated_at)
VALUES 
('Chaise', '2025-11-12', '2025-11-12'),
('Table', '2025-11-12', '2025-11-12'),
('Penderie', '2025-11-12', '2025-11-12'),
('Commode', '2025-11-12', '2025-11-12'),
('Tabouret', '2025-11-12', '2025-11-12'),
('Table basse', '2025-11-12', '2025-11-12'),
('Bureau', '2025-11-12', '2025-11-12'),
('Canapé', '2025-11-12', '2025-11-12'),
('Fauteuil', '2025-11-12', '2025-11-12'),
('Meuble d''appoint', '2025-11-12', '2025-11-12'),
('Biliothèque', '2025-11-12', '2025-11-12'),
('Lit', '2025-11-12', '2025-11-12')

-- @block
UPDATE type
SET name = "Bibliothèque"
WHERE id=11

-- @block
ALTER TABLE furniture
ADD CONSTRAINT furniture_ibfk_6
FOREIGN KEY (orders_id) REFERENCES orders(id)
ON DELETE SET NULL ON UPDATE CASCADE;

-- @block 
DESCRIBE furniture;

-- @block
UPDATE user
SET role = 'USER';

-- @block
DELETE FROM user
WHERE id = 1;

-- @block
UPDATE furniture
SET status = 'on_hold'
WHERE id=5;



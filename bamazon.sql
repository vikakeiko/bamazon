290, 43);


DROP DATABASE IF EXISTS playlist_db;

CREATE DATABASE playlist_db;

USE playlist_db;

CREATE TABLE products (
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name INIT NOT NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10.2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES ("iphoneX", "electoric", 1199.99, 500);
VALUES ("ipad", "electoric", 700.00, 600);
VALUES ("Alexsa", "electoric", 800.01, 120);
VALUE ("dog food", "pets", 30.00, 5000);
VALUE ("monopoly", "toy", 20, 77);
VALUE ("cookie", "food", 5, 6010);
VALUE ("vaccum", "house", 150, 345);
VALUE ("bedsheets", "house", 45, 180);
VALUE ("electoric piano", "instrument", 560, 20);
VALUE ("baby sheeets", "baby", 


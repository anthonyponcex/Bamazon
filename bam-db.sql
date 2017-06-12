CREATE database Bamazon_db;

USE Bamazon_db;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(20) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INT NOT NULL,	
    PRIMARY KEY (item_id)    
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Organic Bananas", "Produce", .99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Organic Kombucha 12 Pack", "Drinks", 700, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cabernet Souveghnin", "Wines", 45, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sprouted Whole Wheat Bread", "Grains", 5.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ben and Jerrys Ice Cream", "Frozen Goods", 6.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Whey Protein Powder", "Supplements", 40.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Produce", .99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carrots", "Produce", 1.50, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BCAAs", "Supplements", 40.00, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pinot Noir", "Wine", 100.0, 100);

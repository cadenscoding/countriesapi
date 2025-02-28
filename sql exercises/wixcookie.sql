CREATE TABLE inventory (
  sku VARCHAR PRIMARY KEY, 
  cookie_name VARCHAR,
  cost INT,
  quantity INT,
  description VARCHAR
);

INSERT INTO inventory (sku, cookie_name, cost, quantity, description)
VALUES 
  ('CK001', 'White Chocolate Bites', 2, 50, 'Yummy white chocolate chip cookie'),
  ('CK002', 'Oatmeal Bites', 2, 40, 'Chewy oatmeal cookies without yucky raisins');

CREATE TABLE orders (
  order_number VARCHAR PRIMARY KEY,
  cookie_quantity VARCHAR,
  total INT
);

INSERT INTO orders (order_number, cookie_quantity, total)
VALUES 
  ('ORD001', '5 White Chocolate Bites', 10),
  ('ORD002', '3 Oatmeal Bites, 10 White Chocolate Bites', 16);

CREATE TABLE cust_info (
  order_number VARCHAR PRIMARY KEY,
  cust_name VARCHAR,
  order_date DATE,
  payment_method VARCHAR,
  address VARCHAR
);

INSERT INTO cust_info (order_number, cust_name, order_date, payment_method, address)
VALUES 
  ('ORD001', 'Alice Johnson', '2025-02-20', 'Credit Card', '123 Main St, Springfield'),
  ('ORD002', 'Bob Smith', '2025-02-21', 'PayPal', '456 Elm St, Riverside');


  UPDATE inventory
SET cookie_name = 'Chocolate Chip Oatmeal Bites'
WHERE sku = 'CK002';

DELETE FROM inventory
WHERE sku = 'CK001';

SELECT * 
FROM inventory
WHERE quantity > 10;

SELECT * 
FROM inventory
WHERE cost > 5;

SELECT * 
FROM cust_info
WHERE order_date > '2025-01-01';

SELECT * 
FROM orders
WHERE cookie_quantity LIKE '%,%';

SELECT * 
FROM orders
WHERE cookie_quantity LIKE '%001%';

SELECT cookie_quantity, SUM(total) AS total_sales
FROM orders
GROUP BY cookie_quantity;
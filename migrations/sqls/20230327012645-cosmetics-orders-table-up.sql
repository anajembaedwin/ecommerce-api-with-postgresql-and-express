/* Replace with your SQL commands */
-- Create table for orders
CREATE TABLE cosmetics_orders (
    id SERIAL PRIMARY KEY, 
    product_id INTEGER REFERENCES cosmetics_products(id), -- Foreign key referencing the id column in cosmetics_products table
    product_quantity INTEGER, -- Normal integer type column
    user_id INTEGER REFERENCES cosmetics_users(id), -- Foreign key referencing the id column in cosmetics_users table
    order_status VARCHAR(50),
    CONSTRAINT unique_id UNIQUE (id) -- Add unique constraint to id column
);


-- - id
-- - id of each product in the order
-- - quantity of each product in the order
-- - user_id
-- - status of order (active or complete)



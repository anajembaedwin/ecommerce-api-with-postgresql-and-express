/* Replace with your SQL commands */
-- Create table for products
CREATE TABLE cosmetics_products (
    id SERIAL PRIMARY KEY, 
    product_name VARCHAR(100), 
    price VARCHAR(100),
    -- category VARCHAR(50), -- Optional column for category
    product_quantity INTEGER UNIQUE, -- Add unique constraint to product_quantity column
    UNIQUE (id) -- Add unique index to id column
);

-- -  id
-- - name
-- - price
-- - [OPTIONAL] category

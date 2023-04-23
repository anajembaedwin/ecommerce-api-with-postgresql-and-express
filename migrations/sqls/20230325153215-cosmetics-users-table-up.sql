/* Replace with your SQL commands */
-- Create table for users
CREATE TABLE cosmetics_users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(100), 
    lastname VARCHAR(100),
    username VARCHAR(50),
    password TEXT NOT NULL,
    UNIQUE (id) -- Add unique index to id column
);
-- - id
-- - firstName
-- - lastName
-- - password
/* Replace with your SQL commands */
CREATE TABLE cosmetics_store_users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(100), 
    lastname VARCHAR(100),
    email TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL
);
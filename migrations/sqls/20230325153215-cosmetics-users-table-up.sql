/* Replace with your SQL commands */
CREATE TABLE cosmetics_users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(100), 
    lastname VARCHAR(100),
    password TEXT NOT NULL
);
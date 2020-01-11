-- Drop and recreate options table
DROP TABLE IF EXISTS options CASCADE;
 CREATE TABLE options (
   id SERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   poll_id INTEGER REFERENCES polls(id) NOT NULL,
   description VARCHAR(255) NOT NULL
 );

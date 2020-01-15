-- Drop and recreate options table
DROP TABLE IF EXISTS options CASCADE;
 CREATE TABLE options (
   id SERIAL PRIMARY KEY,
   choice VARCHAR(255),
   poll_id INTEGER REFERENCES polls(id) NOT NULL,
   vote_total BIGINT,
   description VARCHAR(255)
 );

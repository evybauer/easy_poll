-- Drop and recreate votes table
DROP TABLE IF EXISTS votes CASCADE;
 CREATE TABLE votes (
   id SERIAL PRIMARY KEY,
   rating SMALLINT NOT NULL,
   options_id INTEGER REFERENCES options(id) NOT NULL
 );

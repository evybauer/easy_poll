-- Drop and recreate pools table

DROP TABLE IF EXISTS pools CASCADE;
 CREATE TABLE pools (
   id SERIAL PRIMARY KEY,
   creator_id INTEGER REFERENCES creators(id) NOT NULL,
   title VARCHAR(255) NOT NULL,
   admin_URL VARCHAR(255),
   submission_URL VARCHAR(255)
 );

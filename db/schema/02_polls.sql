-- Drop and recreate pools table

DROP TABLE IF EXISTS polls CASCADE;
 CREATE TABLE polls (
   id SERIAL PRIMARY KEY,
   creator_id INTEGER REFERENCES creators(id),
   title VARCHAR(255) NOT NULL,
   description VARCHAR(255),
   admin_URL VARCHAR(255),
   submission_URL VARCHAR(255)
 );

BEGIN;
INSERT INTO polls (creator_id, title, description)
  VALUES (1, 'whois','him');
INSERT INTO options (poll_id, choice, description)
  VALUES (currval('polls_id_seq'), 'jim','thisguy');
COMMIT;


  -- RETURNING id;
-- BEGIN;
-- INSERT INTO users (username, password)
--   VALUES('test', 'test');
-- INSERT INTO profiles (userid, bio, homepage)
--   VALUES(LAST_INSERT_ID(),'Hello world!', 'http://www.stackoverflow.com');
-- COMMIT;
-- (SELECT id FROM polls ORDER BY id DESC LIMIT 1)

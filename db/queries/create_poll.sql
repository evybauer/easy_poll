-- Insert Data re. the poll into the polls table, additional handling of options for the poll is needed.
-- I have commented this out so that it is not used accidentally, will change when we have real user data, format should stay the same though

-- INSERT INTO polls (creator_id, title, description)
--   VALUES (1, 'Hungry?', 'What to eat for dinner?'),
--          (1, 'Movies!', 'Which of these classics is the best?');
-- --   VALUES (1, 'Cities', 'Which of these is your favorite travel destination?');

-- INSERT INTO options (title, poll_id, description)
--   VALUES ('pizza', 1, 'pepperoni'),
--          ('sushi', 1, 'teryaki bento'),
--          ('fast food', 1, 'burger king'),
--          ('dim sum', 1, 'pork bun'),
--          ('boyz in tha hood', 2, 'dark/drama'),
--          ('juice', 2, 'dark/drama'),
--          ('reservoir dogs', 2, 'crime/independant'),
--          ('menace II society', 2, 'drama/independant');


-- INSERT INTO votes (rating, options_id)
--   VALUES (4, 1),
--          (4, 2),
--          (4, 3),
--          (4, 4),
--          (2, 5),
--          (4, 6),
--          (1, 7),
--          (3, 8);

-- THIS QUERY IS TO BE USED FOR PULLING DATA TO SHOW ON THE VOTING PAGE OF A SPECIFIC POLL

SELECT options.choice, options.description, (SELECT polls.description AS question
  FROM polls
  WHERE polls.id=2
  ORDER BY polls.title)
FROM options
WHERE poll_id=2;

-- SELECT *
-- FROM options
-- WHERE poll


-- SELECT DISTINCT polls.title, (SELECT options.choice
--   FROM options
--   WHERE poll_id=1)

-- FROM polls
-- WHERE polls.id=1
-- GROUP BY polls.title;

-- SELECT options.choice
-- FROM options
-- WHERE poll_id=1;

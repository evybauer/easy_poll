-- THIS QUERY IS TO BE USED FOR PULLING DATA TO SHOW ON THE VOTING PAGE OF A SPECIFIC POLL

SELECT options.choice, (SELECT DISTINCT polls.title
  FROM polls
  WHERE polls.id=1
  ORDER BY polls.title)
FROM options
WHERE poll_id=1;







-- SELECT DISTINCT polls.title, (SELECT options.choice
--   FROM options
--   WHERE poll_id=1)

-- FROM polls
-- WHERE polls.id=1
-- GROUP BY polls.title;

-- SELECT options.choice
-- FROM options
-- WHERE poll_id=1;


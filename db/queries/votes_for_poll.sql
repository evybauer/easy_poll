-- This query is to pull up data regarding the votes submitted for a certain poll


SELECT DISTINCT polls.title, polls.description, options.choice, options.description AS genre, votes.rating AS user_question_feedback
FROM polls, options
JOIN votes ON options_id=options.id
WHERE polls.id=2 AND options.poll_id=2;

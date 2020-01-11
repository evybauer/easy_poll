// CREATE POLL

/**
  * Add a poll to the database
  * @param {{}} poll An object containing all of the poll details.
  * @return {Promise<{}>} A promise to the poll.
  */

const addPoll = function(poll){
  return db.query(
    `INSERT INTO polls (title, description, otpion1, option2, option3, option4)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
 `, [
   poll.title,
   poll.description,
   poll.option1,
   poll.option2,
   poll.option3,
   poll,option4
 ]
 )
 .then(res => {
   console.log('This in the new poll', res);
   if (res.rows.length) {
     return res.rows[0];
   }
   return null;
 });
};
exports.addPoll = addPoll;

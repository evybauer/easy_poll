// CREATE POLL

const { Pool } = require('pg');
const db = require('db');

// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'midterm'
// });

/**
  * Add a poll to the database
  * @param {{}} poll An object containing all of the poll details.
  * @return {Promise<{}>} A promise to the poll.
  */

const addPoll = function(poll) {
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


const countVotes = function() {
  let queryString = `
    SELECT count(*) FROM votes
    ORDER BY option DESC;
  `,;
  console.log('This is count of votes', res);
  return db.query(queryString)
  .then(res => res.rows);
  };
  exports.countVotes = countVotes;

/**
  * Get a single user from the database given their email.
  * @param {String} email The email of the user.
  * @return {Promise<{}>} A promise to the user.
*/

  const getUserWithEmail = function(email) {
    return db.query(`
     SELECT * FROM users
     WHERE email = $1
     LIMIT 1`, [email])
     .then(res => {
       if (res.rows.length) {
         console.log(res.rows[0]);
         return res.rows[0];
       }
       return null;
     });
   };
  exports.getUserWithEmail = getUserWithEmail;

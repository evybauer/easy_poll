// CREATE POLL

const { Pool } = require('pg');
// const db = require('db');

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
module.exports = (db) => {

const addPoll = function(poll) {

  return db.query(
  `
  BEGIN;
  INSERT INTO polls (creator_id, title, description)
    VALUES (1, 'Favorite City','Vacation Destinations');
  INSERT INTO options (poll_id, choice, description)
    VALUES (currval('polls_id_seq'), 'Vancouver','"Rain City');
  COMMIT;
  `
 , [
   poll.title,
   poll.description,
   poll.option1,
   poll.option2,
   poll.option3,
   poll.option4
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


const countVotes = function() {
  let queryString =
  `
    SELECT count(*) FROM votes
    ORDER BY option DESC;
  `;
  console.log('This is count of votes', res);
  return db.query(queryString)
  .then(res => res.rows);
  };

/**
  * Get a single user from the database given their email.
  * @param {String} email The email of the user.
  * @return {Promise<{}>} A promise to the user.
*/

    const countVotes = function() {
      let queryString = `
        SELECT count(*) FROM votes
        ORDER BY option DESC;
      `;
      console.log('This is count of votes', res);
      return db.query(queryString)
      .then(res => res.rows);
      };

    /**
      * Get a single user from the database given their email.
      * @param {String} email The email of the user.
      * @return {Promise<{}>} A promise to the user.
    */

      const getUserWithEmail = function(email) {
        return db.query(`
         SELECT * FROM creators
         WHERE email = $1;
         `, [email])
         .then(res => {
           if (res.rows.length) {
             console.log(res.rows[0]);
             return res.rows[0];
           }
           return null;
         });
       };

    return {
      getUserWithEmail,
      countVotes,
      addPoll
    }
  }


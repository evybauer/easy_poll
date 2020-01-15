// CREATE POLL

// const { Pool } = require('pg');
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
module.exports = db => {

  const addPoll = function(params) {
    // const { title, description, option1, option2, option3, option4 } = polls;
    console.log(params);
    const creator_id = 1; // this could/should be pulled from previous variable, but hardcoded for now, ha ha ha

    const title = params.title;
    const description = params.description;
    // const { option1, option2, option3, option4 } = params;
    const options = {
      option1: params.option1,
      option2: params.option2,
      option3: params.option3,
      option4: params.option4
    };

    const pollInsertString = `
    INSERT INTO polls (creator_id, title, description) VALUES ($1, $2, $3) RETURNING id;
    `;
    return db.query(pollInsertString, [creator_id, title, description]).then(res => {
      const rows = res.rows;
      if (rows.length === 0) {
        throw "why are there no results from inserting a poll?!?!"
      }
      const poll_id = rows[0].id;
      return poll_id;

    }).then(poll_id => {
      let optionPromises = [];

      for (let option in options) {
        let optionInsert = options[option];

        // TODO: insert into options, using (opt_desc, option, poll_id);
        let optionInsertPromise = db.query(
          `
            INSERT INTO options (poll_id, choice)
              VALUES ($1, $2);
          `,
            [poll_id, optionInsert]
        );

        optionPromises.push(optionInsertPromise);
      }
      return Promise.all(optionPromises).then(options => {
        // could reorganize these options things somehow if we want?
        return {
          poll_id,
          options,
          params
        }
      });
    })
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


  const getUserWithEmail = function(email) {
    return db
      .query(
        `
        SELECT * FROM creators
        WHERE email = $1;
        `,
        [email]
      )
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
  };
};

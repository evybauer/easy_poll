require('dotenv').config();

const mailgun = require("mailgun-js");
const DOMAIN = process.env.domain;
const mg = mailgun({ apiKey: process.env.apiKey, domain: DOMAIN });

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

//THIS FUNCTION IS DONE============================================================================================================================

  const addPoll = function(params) {
    const creator_id = 1; // this could/should be pulled from previous variable, but hardcoded for now, ha ha ha

    const title = params.title;
    const description = params.polls_description;

    const options = [
      [params.option1, params.description1],
      [params.option2, params.description2],
      [params.option3, params.description3],
      [params.option4, params.description4]
    ]


    const subURL = generateRandomString();
    const adminURL = generateRandomString();

    const pollInsertString = `
    INSERT INTO polls (creator_id, title, description, submission_URL, admin_URL) VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `;
    return db
      .query(pollInsertString, [
        creator_id,
        title,
        description,
        subURL,
        adminURL
      ])
      .then(res => {
        const rows = res.rows;
        if (rows.length === 0) {
          throw "why are there no results from inserting a poll?!?!";
        }
        const poll_id = rows[0].id;

        let optionPromises = [];

        for (let option of options) {
          // TODO: insert into options, using (opt_desc, option, poll_id);
          let optionInsertPromise = db.query(
            `
            INSERT INTO options (poll_id, choice, description)
              VALUES ($1, $2, $3);
          `,
            [poll_id, ...option]
          );

          optionPromises.push(optionInsertPromise);
        }

        const data = {
          from: "Excited User <me@samples.mailgun.org>",
          to: "swistek.labs@gmail.com",
          subject: `Here is your poll URL for ${title}!`,
          text: `
                URL to send to your friends! localhost:8080/${subURL}
                URL to edit your poll! localhost:8080/${adminURL}
                `
        };
        console.log('about to send email to creator');
        mg.messages().send(data, function(error, body) {
          console.log("errors:", error);
          console.log("body:", body);
        });
        return Promise.all(optionPromises).then(options => {
          // could reorganize these options things somehow if we want?
          return {
            poll_id,
            options,
            params,
            subURL,
            adminURL
          };
        });
      });
  };

  //THIS FUNCTION IS DONE============================================================================================================================
  const countVotes = function(params) {
    // const { selectedPoll } = params.poll;
    let queryString = `
    SELECT polls.title, polls.description, options.choice, options.description, options.vote_total FROM polls
    JOIN options ON poll_id=polls.id
    WHERE poll_id=2;
  `;

  console.log('This is count of votes', res);
  return db.query(queryString)
  .then(res => res.rows);
  };
  //====================================================================================================================================================

  //THIS FUNCTION IS DONE============================================================================================================================
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

  //====================================================================================================================================================

  //THIS FUNCTION IS DONE============================================================================================================================

  const generateRandomString = function() {
    let rando = [];
    for (let i = 0; i <= 6; i++) {
      rando.push(Math.floor(Math.random() * 10));
    }
    rando = rando.join("");
    return rando;
  };

  //====================================================================================================================================================

  return {
    getUserWithEmail,
    countVotes,
    addPoll
  };
};

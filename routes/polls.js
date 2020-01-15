const express = require("express");
const router = express.Router();

// router.post("/", (req, res) => {
//   pollsDatabase = {
//     title: req.body. //
//     description: req.body. //
//     options: req.body. //
//     userID: req.session["id"]};
//     res.redirect("/");
// });

// SEE POLLS CREATED
const queries = require('../lib/database.js')

module.exports = db => {

  router.get("/user1", (req, res) => {
    let query = `SELECT * FROM polls WHERE creator_id=1`;
    console.log(query);
    db.query(query)
      .then(data => {
        const polls = data.rows;
        res.json({ polls });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // CREATE THE POLL


  router.get("/polls", (req, res) => {
    let query = `SELECT * FROM polls
    WHERE creator_id = 1`;
    console.log(query);
    db.query(query)
      .then(data => {
        const polls = data.rows;
        console.log("polls", {polls} );
        res.render("polls",polls);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });


   //SUCCESS MESSAGE

   //THIS ROUTE IS DONE, DO NOT CHANGE UNLESS WE DECIDE ON NEW FUNCTIONALITY
   router.post("/new", function(req,res) {
    // const Id = req.session.Id;
    console.log('request body', req.body);
    queries(db)
     .addPoll(req.body)
     .then(poll => {
       res.send(poll);
       res.redirect("/success");
     })
     .catch(e => {
       console.error(e);
       res.send(e);
     });
    // console.log('hello', req.body.title)
   });


  // router.get("/polls", (req, res) => {
  //     db.query(...)
  //     // authentication of the user
  // });


  //SEE THE POLL
  //Where votes happen
  router.get("/shortid", (req, res) => {
    let shortid = 1;
    db.query(
      `
       SELECT options.choice, options.description, options.vote_total, (SELECT polls.description AS question
         FROM polls
         WHERE polls.id=${shortid}
         ORDER BY polls.title)
       FROM options
       WHERE poll_id=${shortid};
      `
    )
      .then(data => {
        const polls = data.rows;
        console.log(polls);
        res.json({ polls });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // SEE THE RESULTS
  //THIS ROUTE IS WORKING, USING HARD CODED DATA
  router.get("/results", (req, res) => {
    let shortid = 1;
    console.log('here');
    db.query(
      `
      SELECT options.choice, options.description, options.vote_total, (SELECT polls.description AS question
        FROM polls
        WHERE polls.id=1
        ORDER BY polls.title)
        FROM options
        WHERE poll_id=1;
        `
        )
        .then(data => {
          const widgets = data.rows;
          res.json({ widgets });
        })
        .catch(err => {
          res
          .status(500)
          .json({ error: err.message });
        });
      });

    return router;
  };
// The creator will be loged in and will be able to see previous polls
// Click on create and be redirected to the /polls/new where will fill out a new poll

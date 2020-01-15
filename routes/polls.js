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
        res.render("polls", {polls});
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });




   //SUCCESS MESSAGE

  //  router.post("/polls",(req,res) => {
  //   // const Id = req.session.Id;
  //   console.log('request body', req.body);
  //    queries(db)
  //    .addPoll({...req.body})
  //    .then(poll => {
  //      res.send(poll);
  //      res.redirect("/success");
  //    })
  //    .catch(e => {
  //      console.error(e);
  //      res.send(e);3
  //    });
  //  });


  // router.get("/polls", (req, res) => {
  //     db.query(...)
  //     // authentication of the user
  // });

  // router.post("/welcome", (req, res) => {
  //   res.redirect("/polls");
  // });

  router.post("/polls", (req, res) => {
    //const userId = req.session.userId;

    // const { polls_title, polls_description, polls_creator_id, poll_id, options1, options2, options3, options4 } = req.body;
    // could do some manual validation here if you wanted

    // const polls_title = 'title'
    // const polls_description = 'desc'
    // const polls_creator_id = 1;
    // const option1 = '1'
    // const option2 = '2'
    // const option3 = '3'
    // const option4 = '4'

    const object = {
      polls_title: 'title',
      polls_description: 'dscription',
      polls_creator_id: 1,
      option1: '1',
      option2: '2',
      option3: '3',
      option4: '4'
    }

    console.log(req.body);
    queries(db)
      .addPoll(req.body)
      .then(poll => {
        console.log("creating poll seems okay", poll);
       // res.send(poll);
        res.render("success");
      })
      .catch(e => {
        console.error('error', e);
        res.status(500).send(e);
      });
  });

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

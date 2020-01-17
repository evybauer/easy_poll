const express = require("express");
const router = express.Router();
const mailgun = require("../lib/mailgun");
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

   //THIS ROUTE IS DONE, DO NOT CHANGE UNLESS WE DECIDE ON NEW FUNCTIONALITY
   //adding a new poll to DB
   router.post("/polls", function(req,res) {
    queries(db)
     .addPoll(req.body)
     .then(poll => {
       console.log('This is poll', poll)
      //  console.log('URL', poll.submissionURL);
       //pass params to succes ejs with the poll id
       res.render("success", {pollid: poll.poll_id, pollname:poll.params.title}); // WE MUST DINAMICALY REPLACE THE POLL ID SO IT REDIRECTS TO THE CORRECT OPTIONS PAGE
       return;
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

  // SUCCESS PAGE BUTTONS
  router.post("/new_poll", (req, res) => {
    res.redirect("/polls");
  });

  router.post("/vote_here", (req, res) => {
    res.redirect("/shortid");
  });

  router.post("/view_results", (req, res) => {
    res.redirect("/results");
  });

    // HOME
  // Redirects users to the home page where they can see their URLs
  router.post("/view_home", (req, res) => {
    res.render("home");
  });


// VOTING PAGE VOTE BUTTON
  router.post("/view_thanks", (req, res) => {
    res.redirect("/thank_you");
  });


/*


  //SEE THE POLL
  //Where votes happen, this route is done
  router.get("/shortid", (req, res) => {
    let shortid = 2;

    db.query(
      `
      SELECT polls.title, polls.description AS polls_description, options.choice, options.description FROM polls
      JOIN options ON poll_id=polls.id
      WHERE poll_id=2
      `
    )
      .then(data => {
        const params = data.rows;
        console.log(params);
        //res.json({ polls });

        res.render("options",{ params });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
*/

/*

//This route is unused right now?

  router.post("/shortid", (req, res) => {
    console.log("countVotes",req.body);
    queries(db)

    .countVotes()

    .then(poll => {
      console.log('data you asked for', poll)
      res.render("thank_you");
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });
*/


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
          // res.json({ widgets });
          res.render("results", { widgets });
        })
        .catch(err => {
          res
          .status(500)
          .json({ error: err.message });
        });
      });

      //SEE THE POLL
      //Where votes happen
      router.get("/polls/:shortid", (req, res) => {
        let shortid = 2;
        console.log('what is db', db);
        db.query(
          `
          SELECT polls.title, polls.description AS polls_description, options.choice, options.description FROM polls
          JOIN options ON poll_id=polls.id
          WHERE poll_id=$1
          `,
          [req.params.shortid]
        )
          .then(data => {
            const params = data.rows;
            console.log(params);
            //res.json({ polls });
            res.render("options",{ params });
          })
          .catch(err => {
            res.status(500).json({ error: err.message });
          });
      });

      // router.post("/shortid", function(req,res) {
      //   queries(db)
      //    .then(poll => {
      //      res.render("thank_you");
      //      return;
      //    })
      //    .catch(e => {
      //      console.error(e);
      //      res.send(e);
      //    });
      //   // console.log('hello', req.body.title)
      //  });



      router.post("/polls/:shortid", (req, res) => {
        console.log("countVotes",req.body);
        queries(db)
        .countVotes()
        .then(poll => {
          console.log('data you asked for', poll)
          res.render("thank_you");
        })
        .catch(e => {
          console.error(e);
          res.send(e)
        });
      });

    // The creator will be loged in and will be able to see previous polls
    // Click on create and be redirected to the /polls/new where will fill out a new poll
    return router;
  };
// The creator will be loged in and will be able to see previous polls
// Click on create and be redirected to the /polls/new where will fill out a new poll



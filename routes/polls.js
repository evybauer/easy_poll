const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(
      `
    SELECT options.choice, options.description, (SELECT polls.description AS question
      FROM polls
      WHERE polls.id=2
      ORDER BY polls.title)
    FROM options
    WHERE poll_id=2;
    `
    )
      .then(data => {
        const polls = data.rows;
        res.json({ polls });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// router.post("/", (req, res) => {
//   pollsDatabase = {
//     title: req.body. //
//     description: req.body. //
//     options: req.body. //
//     userID: req.session["id"]};
//     res.redirect("/");
// });

// SEE POLLS CREATED

// CREATE THE POLL

// router.get("/polls", (req, res) => {
//   db.query(...)
//   authentication of the user
// })

router.post("/", (req, res) => {
  //const userId = req.session.userId;
  database
    .addPoll({ ...req.body })
    .then(poll => {
      res.send(poll);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

//SEE THE POLL
//Where votes happen

// SEE THE RESULTS

// The creator will be loged in and will be able to see previous polls
// Click on create and be redirected to the /polls/new where will fill out a new poll

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // db.query(`SELECT * FROM users;`)
      .then(data => {
        const polls = data.rows;
        res.json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

router.post("/", (req, res) => {
  pollsDatabase = {
    title: req.body. //
    description: req.body. //
    options: req.body. //
    userID: req.session["id"]};
    res.redirect("/");
});

// The creator will be loged in and will be able to see previous polls
// Click on create and be redirected to the /polls/new where will fill out a new poll

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// ROUTE OF VOTER

// router.post("/authenticateUser", (req, res) => {
//   console.log(req.body)
//   const {email, password} = req.body;
//   login(email, password)
//     .then(user => {
//       if (!user) {
//         res.send({error: "error"});
//         return;
//       }
//       req.session.userId = user.id;
//       // res.send({user: {name: user.name, email: user.email, id: user.id}});
//       res.redirect("/polls")
//     })
//     .catch(e => res.send(e));

//   return router;
// });

router.post("/options", (req, res) => {
  database.countVotes()
  .then(res => {
    res.redirect("/results");
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  });
});




// LOGOUT
router.post("/", (req, res) => {
  req.session = null;
  res.redirect("/");
});

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = (dbHelpers) => {

  router.get('/login', (req, res) => {
    dbHelpers.db.query(`
    SELECT * FROM creators;
    `)
    .then(data => {
      const creator = data.rows[0].email;
      res.json({ creator });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  router.post('/login', (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    dbHelpers.getUserWithEmail(email)
      .then(creator => {
        if (!creator) {
          res.send({ error: "error" });
          return;
        }
        // req.session.userId = user.id;
        // res.send({user: {name: user.name, email: user.email, id: user.id}});
        res.redirect("/polls");
      })

      .catch(e => res.send(e));
    });

    //SUCCESS MESSAGE CREATOR
    router.get("/success", (req, res) => {
      req.session = null;
      res.redirect("/success");
    });

    //THANK YOU MESSAGE VOTER
    router.get("/thank_you", (req, res) => {
      res.redirect("/thank_you");
    });

  router.post("/options", (req, res) => {
    dbHelpers.countVotes()
    .then(res => {
      res.redirect("/results");
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  //     router.post("/options", (req, res) => {
  //       database
  //         .countVotes()
  //         .then(res => {
  //           res.redirect("/results");
  //         })
  //         .catch(e => {
  //           console.error(e);
  //           res.send(e);
  //         });
  //     });

  // LOGOUT
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;

};



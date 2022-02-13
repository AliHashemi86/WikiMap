const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  router.post("/", (req, res) => {
    const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`
    ;
    const users = req.body;
    const queryParams = [
      users.name,
      users.email,
      users.password,
    ];
    return db.query(queryString, queryParams)

      .then((data) => {
        res.json(data.rows[0]);
      });
  });
  return router;
};



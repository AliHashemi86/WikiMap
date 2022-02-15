const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    
    res.render("login");
  });

  router.post("/", (req, res) => {
    const queryString = `
    SELECT email, password FROM users
    WHERE email = $1
    AND password = $2`;
    const users = req.body;
    const queryParams = [users.email, users.password];
    return db
      .query(queryString, queryParams)

      .then((data) => {
        res.redirect("/maps");
      });
  });
  return router;
};

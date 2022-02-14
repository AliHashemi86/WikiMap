const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templatevars = {
      users: null
    };
    res.render("profile", templatevars);
  });
  return router;
};

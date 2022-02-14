const express = require('express');
const router  = express.Router();

///Change this to show all catigories of maps
module.exports = (db) => {
  router.get("/", (req, res) => {
    const templatevars = {
      users: null
    };
    res.render("explore", templatevars);
  });
  return router;
};

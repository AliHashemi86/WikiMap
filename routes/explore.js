const express = require('express');
const router  = express.Router();

///Change this to show all catigories of maps
module.exports = (db) => {
  router.get("/", (req, res) => {
  
    res.render("explore", {users:req.session.users});
  });
  return router;
};


const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("maps");
  });

  router.post("/", (req, res) => {
    const queryString = `
    INSERT INTO maps (user_id, title , description, image, location, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`
    ;
    const maps = req.body;
    const queryParams = [
      maps.user_id,
      maps.title ,
      maps.description,
      maps.image,
      maps.location,
      maps.created_at
    ];
    return db.query(queryString, queryParams)

      .then((data) => {
        res.json(data);
      });
  });
  return router;
};

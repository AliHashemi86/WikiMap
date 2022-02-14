const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("maps");
  });

  router.post("/", (req, res) => {
    const queryString = `
    INSERT INTO maps (title , description, image, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`
    ;
    const maps = req.body;
    const queryParams = [
      maps.user_id,
      maps.title ,
      maps.description,
      maps.image,
      maps.latitude,
      maps.longitude,
    ];
    return db.query(queryString, queryParams)

      .then((data) => {
        res.json(data);
      });
  });
  return router;
};

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('TEST');
    res.render("new_map");
  });

  router.post('/', (req, res) => {
    const maps = req.body;
    const queryString = `
    INSERT INTO maps (title, description, image, latitude, longitude)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    const queryParams = [
      maps.title,
      maps.description,
      maps.image,
      maps.latitude,
      maps.longitude
    ];

    return db.query(queryString, queryParams)
    .then((data) => {
      const maps = data.rows;
      res.json({ maps });
      // console.log(maps)
    })
    .catch(err => console.log(err));
  });
  return router;
};

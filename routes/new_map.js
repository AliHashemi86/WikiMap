const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("new_map");
  });

  router.post('/', (req, res) => {
    const maps = req.body;
    const queryString = `
    INSERT INTO maps (title, description, image, location)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `;
    const queryParams = [
      maps.title,
      maps.description,
      maps.image,
      maps.location,
    ];

    return db.query(queryString, queryParams)
      .then((data) => {
        console.log('one');
        console.log(data.rows);
        res.json(data.rows);
      })
      .catch(err => console.log(err));
  });
  return router;
};

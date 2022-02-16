const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("new_map");
  });

  // Map Points//
  // router.post('/', (req, res) => {
  //   const maps = req.body;
  //   const queryString = `
  //   INSERT INTO points (title, description, image, latitude, longitude)
  //   VALUES($1, $2, $3, $4, $5)
  //   RETURNING *;
  //   `;
  //   const queryParams = [
  //     maps.title,
  //     maps.description,
  //     maps.image,
  //     maps.latitude,
  //     maps.longitude
  //   ];

  //   return db.query(queryString, queryParams)

  //     .then((data) => {
  //       const maps = data.rows;
  //       res.json({ maps });
  //     })
  //     .catch(err => console.log(err));
  // });

  // MAP//
  router.post('/', (req, res) => {
    const newMap = req.body;
    const queryString = `
    INSERT INTO maps (title, latitude, longitude)
    VALUES($1, $2, $3)
    RETURNING *;
    `;
    const queryParams = [
      newMap.titles,
      newMap.latitudes,
      newMap.longitudes
    ];

    return db.query(queryString, queryParams)

      .then((data) => {
        const newMap = data.rows;
        res.json({ newMap });
      })
      .catch(err => console.log(err));
  });

  return router;
};

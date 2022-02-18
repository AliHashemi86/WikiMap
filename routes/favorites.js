const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT * FROM favorites
    JOIN maps ON maps.id = map_id
    JOIN users ON users.id = user_id
    WHERE user_id = 1;
    ;`)
      .then(data => {
        const fav = data.rows;
        res.json({ fav });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const testFav = req.body;
    console.log(testFav)
    const queryString = `
    INSERT INTO favorites (user_id, map_id)
    VALUES($1, $2)
    RETURNING *;
    `;
    const queryParams = [
      1,
      testFav.map_id
    ];

    return db
      .query(queryString, queryParams)
      .then(data => {
        const addFav = data.rows;
        res.redirect('/maps')
        res.json({ addFav });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


return router;
};


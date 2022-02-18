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
return router;
};

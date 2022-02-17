const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT * FROM points;`)
      .then(data => {
        const mapPoints = data.rows;
        res.json({ mapPoints });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

router.post("/", (req, res) => {
  const delPoint = req.body
  console.log(delPoint)
  const queryString = `DELETE FROM points
  WHERE id = $1
  RETURNING *;`;

  const queryParams = [
    delPoint.id,
  ];

  return db.query(queryString, queryParams)
  .then((data) => {
    // console.log('this update data',data)
    // console.log(data.rows)
    const point = data.rows;
    res.redirect('/createMapPoints')

    res.json({ point });
  })
  .catch(err => console.log(err));
});

  return router;
};

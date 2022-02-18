const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("createMap", {users:req.session.users});
  });

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
        console.log('this is data',data);
        console.log(data.rows);
        const newMap = data.rows;
        res.redirect('/createMapPoints');
        res.json({ newMap });
      })
      .catch(err => console.log(err));
  });

  return router;
};

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   // const user_id =
  //   // const map_id =
  //   const values = req.body;
  //   console.log(values)
  //   const queryString = `
  //   SELECT * FROM favorites WHERE user_id = $1 AND map_id = $2;`
  //   const queryParams = [
  //     values.user_id,
  //     values.map_id
  //   ];

  //   db.query()
  //     .then(data => {
  //       const fav = data.rows;
  //       res.json({ fav });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
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

  // router.post("/", (req, res) => {
  //   const newFav = req.body;
  //   const queryString = `
  //   INSERT INTO favorites (map_id, user_id, longitude)
  //   VALUES($1, $2, $3)
  //   RETURNING *;
  //   `;
  //   const queryParams = [
  //     newFav.map_id,
  //     newFav.user_id,
  //   ];

  //   return db
  //     .query(queryString, queryParams)

  //     .then((data) => {
  //       const maps = data.rows;
  //       res.redirect("/maps");
  //       res.json({ maps });
  //     })
  //     .catch((err) => console.log(err));
  // });


// `
// // SELECT * FROM favorites
// //   WHERE user_id = $1
// //   AND list_id = $2
// // `, [userid, mapid]
return router;
};

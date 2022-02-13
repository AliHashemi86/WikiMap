const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('TEST');
    res.render("new_map");
  });
  return router;
};

///created map added to database?
const createMap = function(maps) {
  const queryString = `
  INSERT INTO properties (user_id, title, description, image, location, created_at)
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;
  const queryParams = [
    maps.user_id,
    maps.title,
    maps.description,
    maps.image,
    maps.location,
    maps.created_at
  ];

  database.query(queryString, queryParams).then((res) => {
     console.log(res.rows) });
}
exports.createMap = createMap;

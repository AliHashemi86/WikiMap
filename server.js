// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const sessionConfig = {
  name: "monster", // name of cookie
  secret: process.env.SECRET, // secret that makes the cookie effective (find in ENV)
  cookie: {
    maxAge: 1000 * 60 * 60, // time span of cookie
    secure: false, // for production, set to true for HTTPS only access
    httpOnly: true, // true means no access from javascript
  },
  resave: false,
  saveUnitialized: true, // doesn't ask users to consent, change in production.
};

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(session(sessionConfig));

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const exploreRoutes = require("./routes/explore");
const mapsRoutes = require("./routes/maps");
const loginRoutes = require("./routes/login");
const new_mapRoutes = require("./routes/new_map");
const mapPointsRoutes = require("./routes/mapPoints");
const pointsRoutes = require("./routes/points");



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/explore", exploreRoutes(db));
app.use("/maps", mapsRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/new_map", new_mapRoutes(db));
app.use("/api/mapPoints", mapPointsRoutes(db));
app.use("/api/points", pointsRoutes(db));



// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

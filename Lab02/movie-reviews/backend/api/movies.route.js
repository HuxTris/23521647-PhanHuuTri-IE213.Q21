const express = require("express");
const MoviesController = require("./movies.controller");

const router = express.Router();

router.route("/").get(MoviesController.apiGetMovies);

module.exports = router;
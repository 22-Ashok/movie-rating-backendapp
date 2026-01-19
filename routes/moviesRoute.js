const router = require("express").Router();
const getAllMovies = require("../controllers/movies/getAllMovies");
const authentication = require("../middlewares/authentication")
const adminMiddleware = require("../middlewares/adminMiddleware")
const addMovie = require("../controllers/movies/addMovie");
const deleteMovie = require("../controllers/movies/deleteMovie")
const searchMovie = require("../controllers/movies/searchMovie")
const getMovie = require("../controllers/movies/getMovie")
const postReview = require("../controllers/reviews/postReview")

router.get('/movies', getAllMovies);
router.post('/movies', authentication, adminMiddleware, addMovie);
router.delete('/movies/:movieId', authentication, adminMiddleware, deleteMovie);
router.get('/movies/search', searchMovie);
router.get('/movies/:movieId', getMovie);

// for review
router.post('/movies/:movieId/reviews', authentication, postReview);
/*
router.put('/movies/:movieId/reviews', authentication, editReview);
router.delete('/review/:reviewId', authentication, deleteReview); */

module.exports = router;
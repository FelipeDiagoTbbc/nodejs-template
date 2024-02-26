const router = require("express").Router();

const {adminController} = require('../controllers')

// Admin routes
router.get('/', adminController.getMovies)
router.get('/id:', adminController.getMovieById)

module.exports = router

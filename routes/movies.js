const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieIdValidation, createMovieValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);

router.post('/movies', createMovieValidation, addMovie);

router.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = router;

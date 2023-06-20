const movieRouter = require('express').Router();

const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidation,
  checkMovieId,
} = require('../middlewares/validation');

// Get user's movies
movieRouter.get('/', getUserMovies);

// Create movie
movieRouter.post('/', createMovieValidation, createMovie);

// Delete movie
movieRouter.delete('/:movieId', checkMovieId, deleteMovie);

module.exports = movieRouter;

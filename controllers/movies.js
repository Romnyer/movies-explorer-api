const mongooseError = require('mongoose').Error;

const Movie = require('../models/movie');

const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
} = require('../constants/constants');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

// Get user's movies
module.exports.getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        res.status(OK_STATUS_CODE).send({
          message: 'Нет сохранённых фильмов',
        });
        return;
      }
      res.status(OK_STATUS_CODE).send(movies);
    })
    .catch((err) => {
      if (err instanceof mongooseError.CastError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

// Create movie
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(CREATED_STATUS_CODE).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongooseError.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

// Delete movie
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с таким id не найден'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы можете удалять только свои фильмы'));
      }

      return Movie.deleteOne(movie)
        .then(() => res.status(OK_STATUS_CODE).send(movie));
    })
    .catch((err) => {
      if (err instanceof mongooseError.CastError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

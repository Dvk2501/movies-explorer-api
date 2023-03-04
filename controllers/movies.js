const Movie = require('../models/movie');
const {
  OK,
} = require('../constats');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const NotAllowedError = require('../errors/NotAllowedError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
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
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм с таким _id не найден'))
    .then((movie) => {
      if (movie.owner.equals(userId)) {
        return movie.remove().then(() => res.status(OK).send({ message: 'Фильм успешно удален' }));
      }
      return next(new NotAllowedError('У данного пользователя нет прав для удаления этого фильма.'));
    })
    .catch(next);
};

const { celebrate, Joi } = require('celebrate');

module.exports.signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string()
      .required()
      .pattern(/http[s]?:\/\/(?:www\.)?([\w-]+\.)+\/?\S*$/),
    trailerLink: Joi.string()
      .required()
      .pattern(/http[s]?:\/\/(?:www\.)?([\w-]+\.)+\/?\S*$/),
    thumbnail: Joi.string()
      .required()
      .pattern(/http[s]?:\/\/(?:www\.)?([\w-]+\.)+\/?\S*$/),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

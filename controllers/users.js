const mongooseError = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
} = require('../constants/constants');

const { NODE_ENV, JWT_CODE } = process.env;

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const AuthError = require('../errors/authError');
const ConflictError = require('../errors/conflictError');

// Get me
module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.status(OK_STATUS_CODE).send(user);
    })
    .catch((err) => {
      if (err instanceof mongooseError.CastError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

// Login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_CODE : 'secret-key',
            { expiresIn: '7d' },
          );

          res.send({ token });
        });
    })
    .catch(next);
};

// Create user
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        // Exclude password from sending
        const userWithoutPass = {
          name: user.name,
          email: user.email,
          id: user._id,
        };

        res.status(CREATED_STATUS_CODE).send(userWithoutPass);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует!'));
          return;
        }

        if (err instanceof mongooseError.ValidationError) {
          next(new BadRequestError('Переданы некорректные данные'));
          return;
        }

        next(err);
      }));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(OK_STATUS_CODE).send(user);
    })
    .catch((err) => {
      if (err instanceof mongooseError.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с таким id не найден'));
        return;
      }

      if (err instanceof mongooseError.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError('Этот email занят другим пользователем'));
        return;
      }

      next(err);
    });
};

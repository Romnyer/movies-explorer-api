const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const {
  loginValidation,
  createUserValidation,
} = require('../middlewares/validation');
const auth = require('../middlewares/auth');

// Public routes
router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

// Authorization protection
router.use(auth);

// Protected routes
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

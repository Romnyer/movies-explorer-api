const userRouter = require('express').Router();

const {
  getMe,
  updateProfile,
} = require('../controllers/users');
const {
  updateProfileValidation,
} = require('../middlewares/validation');

// Get me
userRouter.get('/me', getMe);

// Update profile
userRouter.patch('/me', updateProfileValidation, updateProfile);

module.exports = userRouter;

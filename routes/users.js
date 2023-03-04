const router = require('express').Router();
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

const { updateUserValidation } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;

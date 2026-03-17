const router = require('express').Router();
const { signup, login } = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;

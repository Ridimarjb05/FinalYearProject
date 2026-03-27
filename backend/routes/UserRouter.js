const router = require('express').Router();
const { updateProfile, updatePassword, getProfile } = require('../controllers/UserController');
const ensureAuthenticated = require('../middlewares/Auth');

router.get('/profile', ensureAuthenticated, getProfile);
router.put('/update-profile', ensureAuthenticated, updateProfile);
router.put('/update-password', ensureAuthenticated, updatePassword);

module.exports = router;

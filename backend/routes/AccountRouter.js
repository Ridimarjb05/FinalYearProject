const ensureAuthenticated = require('../middlewares/Auth');
const { createAccount, getAccounts, updateAccount, deleteAccount } = require('../controllers/AccountController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, getAccounts);
router.post('/', ensureAuthenticated, createAccount);
router.put('/:id', ensureAuthenticated, updateAccount);
router.delete('/:id', ensureAuthenticated, deleteAccount);

module.exports = router;

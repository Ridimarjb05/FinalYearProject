const ensureAuthenticated = require('../middlewares/Auth');
const { transactionCreateValidation } = require('../middlewares/TransactionValidation');
const { createTransaction, getPartyTransactions, getAllTransactions } = require('../controllers/TransactionController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, getAllTransactions);
router.get('/:partyId', ensureAuthenticated, getPartyTransactions);
router.post('/', ensureAuthenticated, transactionCreateValidation, createTransaction);

module.exports = router;

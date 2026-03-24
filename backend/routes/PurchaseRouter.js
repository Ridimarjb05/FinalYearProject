const ensureAuthenticated = require('../middlewares/Auth');
const { createPurchase, getMyPurchases, deletePurchase, getPurchaseById, updatePurchase } = require('../controllers/PurchaseController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, getMyPurchases);
router.post('/', ensureAuthenticated, createPurchase);
router.get('/:id', ensureAuthenticated, getPurchaseById);
router.put('/:id', ensureAuthenticated, updatePurchase);
router.delete('/:id', ensureAuthenticated, deletePurchase);

module.exports = router;


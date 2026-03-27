const router = require('express').Router();
const { getMyVatBills, getVatBillById, getVatBillByInvoiceId } = require('../controllers/VatBillController');
const ensureAuthenticated = require('../middlewares/Auth');

router.get('/', ensureAuthenticated, getMyVatBills);
router.get('/:id', ensureAuthenticated, getVatBillById);
router.get('/invoice/:invoiceId', ensureAuthenticated, getVatBillByInvoiceId);

module.exports = router;

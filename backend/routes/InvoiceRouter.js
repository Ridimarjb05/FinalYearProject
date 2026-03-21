const ensureAuthenticated = require('../middlewares/Auth');
const { createInvoice, getMyInvoices, getInvoiceById, deleteInvoice, updateInvoice } = require('../controllers/InvoiceController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, getMyInvoices);
router.get('/:id', ensureAuthenticated, getInvoiceById);
router.post('/', ensureAuthenticated, createInvoice);
router.put('/:id', ensureAuthenticated, updateInvoice);
router.delete('/:id', ensureAuthenticated, deleteInvoice);

module.exports = router;

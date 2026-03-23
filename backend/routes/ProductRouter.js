const ensureAuthenticated = require('../middlewares/Auth');
const { productCreateValidation } = require('../middlewares/ProductValidation');
const { 
    createProduct, 
    listMyProducts, 
    getMyProduct, 
    updateProduct, 
    deleteProduct, 
    adjustProductStock,
    exportInventory,
    listLowStockProducts 
} = require('../controllers/ProductController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, listMyProducts);
router.get('/low-stock', ensureAuthenticated, listLowStockProducts);
router.get('/export-inventory', ensureAuthenticated, exportInventory);
router.get('/:id', ensureAuthenticated, getMyProduct);
router.post('/', ensureAuthenticated, productCreateValidation, createProduct);
router.put('/:id', ensureAuthenticated, updateProduct);
router.post('/adjust-stock/:id', ensureAuthenticated, adjustProductStock);
router.delete('/:id', ensureAuthenticated, deleteProduct);

module.exports = router;

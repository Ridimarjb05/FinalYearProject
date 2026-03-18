const ensureAuthenticated = require('../middlewares/Auth');
const {
    listExpenses, createExpense, updateExpense, deleteExpense,
    listCategories, createCategory
} = require('../controllers/ExpenseController');

const router = require('express').Router();

// Expenses
router.get('/', ensureAuthenticated, listExpenses);
router.post('/', ensureAuthenticated, createExpense);
router.put('/:id', ensureAuthenticated, updateExpense);
router.delete('/:id', ensureAuthenticated, deleteExpense);

// Categories
router.get('/categories', ensureAuthenticated, listCategories);
router.post('/categories', ensureAuthenticated, createCategory);

module.exports = router;

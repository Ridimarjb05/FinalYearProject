const Expense = require('../Models/Expense');
const ExpenseCategory = require('../Models/ExpenseCategory');

const listExpenses = async (req, res) => {
    try {
        const { _id } = req.user;
        const expenses = await Expense.find({ user: _id })
            .populate('category', 'name')
            .sort({ date: -1 });
        res.status(200).json({ success: true, expenses });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const createExpense = async (req, res) => {
    try {
        const { _id } = req.user;
        const { title, amount, category, date, paymentMode, remarks } = req.body;
        const newExpense = new Expense({ title, amount, category, date, paymentMode, remarks, user: _id });
        await newExpense.save();
        res.status(201).json({ success: true, message: 'Expense created', expense: newExpense });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create expense' });
    }
}

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, date, paymentMode, remarks } = req.body;
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { title, amount, category, date, paymentMode, remarks },
            { new: true }
        );
        if (!updatedExpense) return res.status(404).json({ success: false, message: 'Expense not found' });
        res.status(200).json({ success: true, message: 'Expense updated', expense: updatedExpense });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update expense' });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Expense.findOneAndDelete({ _id: id, user: req.user._id });
        if (!deleted) return res.status(404).json({ success: false, message: 'Expense not found' });
        res.status(200).json({ success: true, message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete expense' });
    }
}

// Categories
const listCategories = async (req, res) => {
    try {
        const { _id } = req.user;
        const categories = await ExpenseCategory.find({ user: _id });
        res.status(200).json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const createCategory = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name, description } = req.body;
        const newCategory = new ExpenseCategory({ name, description, user: _id });
        await newCategory.save();
        res.status(201).json({ success: true, message: 'Category created', category: newCategory });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create category' });
    }
}

module.exports = {
    listExpenses, createExpense, updateExpense, deleteExpense,
    listCategories, createCategory
}

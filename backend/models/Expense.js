const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'expenseCategories',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['Cash', 'Bank', 'Cheque', 'Other'],
        default: 'Cash',
        required: true
    },
    remarks: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.models.expenses || mongoose.model('expenses', ExpenseSchema);

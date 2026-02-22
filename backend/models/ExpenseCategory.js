const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('expenseCategories', ExpenseCategorySchema);

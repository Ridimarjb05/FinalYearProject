const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        partyId: {
            type: Schema.Types.ObjectId,
            ref: 'parties',
            required: true
        },
        partyName: {
            type: String,
            required: true
        },
        name: { 
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: { 
            type: String,
            required: true,
            default: 'Paid'
        },
        date: {
            type: Date,
            default: Date.now
        },
        balanceAfter: { 
            type: Number,
            required: true
        },
        remarks: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            enum: ['Sale', 'Purchase', 'Payment_In', 'Payment_Out', 'Opening_Balance'],
            required: true
        },
        mode: {
            type: String,
            enum: ['Cash', 'Cheque', 'Online', 'None'],
            default: 'Cash'
        },
        referenceId: {
            type: Schema.Types.ObjectId,
            required: false // Optional, links to Invoice/Purchase
        }
    },
    {
        timestamps: true
    }
);

const TransactionModel = mongoose.model('transactions', TransactionSchema);
module.exports = TransactionModel;

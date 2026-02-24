const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        businessName: {
            type: String,
            required: true
        },
        businessAddress: {
            type: String,
            default: ''
        },
        businessPan: {
            type: String,
            default: ''
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
        invoiceNo: {
            type: String,
            required: true
        },
        invoiceDate: {
            type: Date,
            default: Date.now
        },
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },
                name: String,
                quantity: Number,
                rate: Number,
                discountPercent: { type: Number, default: 0 },
                discountAmount: { type: Number, default: 0 },
                amount: Number
            }
        ],
        subTotal: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        notes: String,
        paymentMode: {
            type: String,
            enum: ['Cash', 'Cheque', 'Online'],
            default: 'Cash'
        },
        paidAmount: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Unpaid', 'Partial', 'Paid'],
            default: 'Unpaid'
        }
    },
    {
        timestamps: true
    }
);

const InvoiceModel = mongoose.model('invoices', InvoiceSchema);
module.exports = InvoiceModel;

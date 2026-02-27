const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema(
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
        purchaseNo: {
            type: String,
            required: true
        },
        purchaseDate: {
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
        status: {
           type: String,
           enum: ['PAID', 'UNPAID', 'PARTIAL'],
           default: 'UNPAID'
        }
    },
    {
        timestamps: true
    }
);

const PurchaseModel = mongoose.model('purchases', PurchaseSchema);
module.exports = PurchaseModel;

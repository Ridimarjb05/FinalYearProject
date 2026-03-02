const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VatBillSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        invoiceId: {
            type: Schema.Types.ObjectId,
            ref: 'invoices',
            required: true
        },
        invoiceNo: {
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
        billDate: {
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
                purchasePrice: Number, // Snapshot at time of sale
                vatRate: { type: Number, default: 20 },
                vatAmount: Number,
                totalAmount: Number
            }
        ],
        subTotalPurchase: {
            type: Number,
            required: true
        },
        totalVat: {
            type: Number,
            required: true
        },
        grandTotal: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const VatBillModel = mongoose.model('vat_bills', VatBillSchema);
module.exports = VatBillModel;

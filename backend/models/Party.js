const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            enum: ['Customer', 'Supplier', 'Bank'],
            required: true
        },
        phone: {
            type: String,
            trim: true
        },
        balance: {
            type: Number,
            default: 0
        },
        openingBalance: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Payable', 'Receivable'],
            default: 'Receivable'
        },
        address: {
            type: String,
            trim: true
        },
        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const PartyModel = mongoose.model('parties', PartySchema);
module.exports = PartyModel;

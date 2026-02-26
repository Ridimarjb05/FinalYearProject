const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
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
        sku: {
            type: String,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0
        },
        purchasePrice: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        category: {
            type: String,
            trim: true
        },
        ageGroup: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            trim: true
        },
        minStock: {
            type: Number,
            default: 5,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

// Ensure SKU is unique per user
ProductSchema.index({ userId: 1, sku: 1 }, { unique: true });

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;

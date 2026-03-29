const ProductModel = require('../models/Product');

/**
 * Shared utility to adjust stock for multiple items.
 * Used by Purchase and Sales controllers.
 */
const adjustStock = async (userId, items, multiplier, referenceNo, type) => {
    for (const item of items) {
        if (!item.productId) continue;
        
        await ProductModel.findOneAndUpdate(
            { _id: item.productId, userId: userId },
            { $inc: { quantity: item.quantity * multiplier } }
        );
    }
};

/**
 * Filter function to identify low stock products.
 * This matches the logic described in your report.
 */
const getLowStockProducts = (products) => {
    return products.filter(p => {
        const currentStock = Number(p.quantity) || 0;
        const minThreshold = Number(p.minStock) || 5; // Default to 5 if not set
        return currentStock <= minThreshold;
    });
};

const validateSKU = async (sku) => {
    const existing = await ProductModel.findOne({ sku });
    if (existing) {
        throw new Error("SKU already exists");
    }
    return true;
};

const deductStock = (product, soldAmount) => {
    product.quantity -= soldAmount;
    return product;
};

module.exports = {
    adjustStock,
    getLowStockProducts,
    validateSKU,
    deductStock
};

const ProductModel = require('../models/Product');
const logActivity = require('../utils/logger');
const { getLowStockProducts } = require('../utils/inventory');
const XLSX = require('xlsx');

const listLowStockProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({ userId: req.user._id });
        const lowStock = getLowStockProducts(products);
        res.status(200).json({
            success: true,
            products: lowStock
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, sku, quantity, unitPrice, purchasePrice, category, ageGroup, gender, minStock } = req.body;
        
        // SKU uniqueness check for the specific user
        if (sku) {
            const existingProduct = await ProductModel.findOne({ userId: req.user._id, sku });
            if (existingProduct) {
                return res.status(409).json({
                    success: false,
                    message: `Product with SKU "${sku}" already exists`
                });
            }
        }

        const product = new ProductModel({
            userId: req.user._id,
            name,
            sku,
            quantity,
            unitPrice,
            purchasePrice: purchasePrice || 0,
            category,
            ageGroup,
            gender,
            minStock: minStock || 5
        });
        await product.save();

        await logActivity(req.user._id, 'CREATE', 'Product', name, `Added new product: ${name} (SKU: ${sku}) with ${quantity} units`);

        res.status(201).json({
            success: true,
            message: 'Product created',
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const listMyProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getMyProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findOne({ _id: id, userId: req.user._id });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // SKU uniqueness check if SKU is being updated
        if (updateData.sku) {
            const existingProduct = await ProductModel.findOne({ 
                userId: req.user._id, 
                sku: updateData.sku,
                _id: { $ne: id } // exclude current product
            });
            if (existingProduct) {
                return res.status(409).json({
                    success: false,
                    message: `Another product with SKU "${updateData.sku}" already exists`
                });
            }
        }
        
        const oldProduct = await ProductModel.findOne({ _id: id, userId: req.user._id });
        if (!oldProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const product = await ProductModel.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { $set: updateData },
            { new: true }
        );
        
        // Log auditing for Price and Stock specifically
        if (updateData.quantity !== undefined && updateData.quantity !== oldProduct.quantity) {
            const diff = updateData.quantity - (oldProduct.quantity || 0);
            const details = diff > 0 ? `${diff} stocks added manually` : `${Math.abs(diff)} stocks reduced manually`;
            await logActivity(req.user._id, 'STOCK_ADJUST', 'Product', product.name, details, oldProduct.quantity, product.quantity, 'quantity');
        }

        if (updateData.unitPrice !== undefined && updateData.unitPrice !== oldProduct.unitPrice) {
            const details = `Unit price changed from ${oldProduct.unitPrice} to ${updateData.unitPrice}`;
            await logActivity(req.user._id, 'PRICE_UPDATE', 'Product', product.name, details, oldProduct.unitPrice, product.unitPrice, 'unitPrice');
        }

        // Generic update log if neither price nor stock but something changed
        if (updateData.quantity === undefined && updateData.unitPrice === undefined) {
            await logActivity(req.user._id, 'UPDATE', 'Product', product.name, 'Updated product details');
        }
        
        res.status(200).json({
            success: true,
            message: 'Product updated',
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await logActivity(req.user._id, 'DELETE', 'Product', product.name, `Deleted product: ${product.name} (SKU: ${product.sku})`);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const adjustProductStock = async (req, res) => {
    try {
        const { id } = req.params;
        // Accept both versions of names for flexibility
        const adjustment = req.body.adjustment || req.body.increment;
        const reason = req.body.reason || req.body.remarks;
        const userId = req.user._id;

        if (adjustment === undefined || adjustment === null) {
            return res.status(400).json({ success: false, message: 'Adjustment amount is required' });
        }

        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: id, userId },
            { $inc: { quantity: Number(adjustment) } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const oldQty = updatedProduct.quantity - Number(adjustment);

        await logActivity(
            userId, 
            'STOCK_ADJUST', 
            'Product', 
            updatedProduct.name, 
            `Manual adjustment: ${adjustment > 0 ? '+' : ''}${adjustment} units. Reason: ${reason || 'Not specified'}`,
            oldQty,
            updatedProduct.quantity,
            'quantity'
        );

        res.status(200).json({
            success: true,
            message: 'Stock adjusted successfully',
            product: updatedProduct
        });
    } catch (err) {
        console.error('Adjust Stock Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

const exportInventory = async (req, res) => {
    try {
        const products = await ProductModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        
        const dataToExport = products.map((p, index) => ({
            'S.N.': index + 1,
            'Product Name': p.name,
            'SKU': p.sku || '-',
            'Age Group': p.ageGroup || '-',
            'Gender': p.gender || '-',
            'Category': p.category || '-',
            'Stock': Number(p.quantity || 0),
            'Unit Price': Number(p.unitPrice || 0),
            'Total Value': (Number(p.quantity || 0) * Number(p.unitPrice || 0)).toFixed(2)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

        worksheet['!cols'] = [
            { wch: 5 }, { wch: 30 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 10 }, { wch: 12 }, { wch: 15 }
        ];

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        const filename = `Inventory_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.status(200).send(buffer);
        
    } catch (err) {
        res.status(500).json({ success: false, message: 'Export failed' });
    }
};

module.exports = {
    createProduct,
    listMyProducts,
    getMyProduct,
    updateProduct,
    deleteProduct,
    adjustProductStock,
    exportInventory,
    listLowStockProducts
};

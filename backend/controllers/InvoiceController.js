const InvoiceModel = require('../models/Invoice');
const ProductModel = require('../models/Product');
const UserModel = require('../models/User');
const VatBillModel = require('../models/VatBill');
const logActivity = require('../utils/logger');
const { adjustStock } = require('../utils/inventory');
const { syncLedgerRecord, reverseLedgerRecord } = require('../utils/ledger');

// Shared adjustStock utility is now used

// Helper to generate/update VAT bill for an invoice
const syncVatBill = async (invoice, userId) => {
    try {
        const vatItems = [];
        let subTotalPurchase = 0;
        let totalVat = 0;

        for (const item of invoice.items) {
            if (item.productId) {
                const product = await ProductModel.findOne({ _id: item.productId, userId });
                if (product) {
                    const pPrice = product.purchasePrice || 0;
                    const markedUpRate = pPrice * 1.20; // Cost + 20%
                    const lineAmount = markedUpRate * item.quantity;
                    
                    vatItems.push({
                        productId: item.productId,
                        name: item.name,
                        quantity: item.quantity,
                        purchasePrice: markedUpRate,
                        vatRate: 13,
                        vatAmount: lineAmount * 0.13,
                        totalAmount: lineAmount * 1.13
                    });
                    
                    subTotalPurchase += lineAmount;
                    totalVat += (lineAmount * 0.13);
                }
            }
        }

        if (vatItems.length > 0) {
            const vatData = {
                userId,
                invoiceId: invoice._id,
                invoiceNo: invoice.invoiceNo,
                partyId: invoice.partyId,
                partyName: invoice.partyName,
                billDate: invoice.invoiceDate,
                businessAddress: invoice.businessAddress,
                businessPan: invoice.businessPan,
                items: vatItems,
                subTotalPurchase,
                totalVat,
                grandTotal: subTotalPurchase + totalVat
            };

            await VatBillModel.findOneAndUpdate(
                { invoiceId: invoice._id, userId },
                { $set: vatData },
                { upsert: true, new: true }
            );
        }
    } catch (err) {
        console.error('VAT Sync Error:', err);
    }
};

const createInvoice = async (req, res) => {
    try {
        const { partyId, partyName, invoiceNo, invoiceDate, items, subTotal, totalAmount, notes, paymentMode } = req.body;
        const userId = req.user._id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const paidAmount = Number(req.body.paidAmount) || 0;
        let pStatus = 'Unpaid';
        if (paidAmount >= totalAmount) pStatus = 'Paid';
        else if (paidAmount > 0) pStatus = 'Partial';

        const newInvoice = new InvoiceModel({
            userId,
            businessName: user.businessName || 'SmartStock Inc.',
            businessAddress: user.address || '',
            businessPan: user.pan || '',
            partyId,
            partyName,
            invoiceNo,
            invoiceDate,
            items,
            subTotal,
            totalAmount,
            notes,
            paymentMode,
            paidAmount,
            status: pStatus
        });
        await newInvoice.save();

        // 1. Real-time Stock Deduction
        await adjustStock(userId, items, -1, invoiceNo, 'Invoice');

        // 2. Financial Ledger Linkage (Sale Entry)
        await syncLedgerRecord({
            userId,
            partyId,
            amount: totalAmount,
            type: 'Sale',
            mode: 'None',
            referenceId: newInvoice._id,
            name: `Sale (Invoice: ${invoiceNo})`,
            remarks: notes
        });

        // 3. Payment Entry if any received
        if (paidAmount > 0) {
            await syncLedgerRecord({
                userId,
                partyId,
                amount: paidAmount,
                type: 'Payment_In',
                mode: paymentMode,
                referenceId: newInvoice._id,
                name: `Payment Received (Invoice: ${invoiceNo})`,
                remarks: 'Auto-recorded during checkout'
            });
        }

        // 4. Sync VAT Bill
        await syncVatBill(newInvoice, userId);

        await logActivity(
            userId,
            'CREATE',
            'Invoice',
            invoiceNo,
            `Created sales invoice for ${partyName} (Total: Rs ${totalAmount})`
        );

        res.status(201).json({
            success: true,
            message: 'Invoice created, stock deducted and ledger updated',
            invoice: newInvoice
        });
    } catch (err) {
        console.error('Create Invoice Error:', err);
        res.status(400).json({
            success: false,
            message: err.message || 'Failed to create invoice'
        });
    }
};

const getMyInvoices = async (req, res) => {
    try {
        const invoices = await InvoiceModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            invoices
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getInvoiceById = async (req, res) => {
    try {
        const invoice = await InvoiceModel.findOne({ _id: req.params.id, userId: req.user._id });
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        res.status(200).json({ success: true, invoice });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoice = await InvoiceModel.findOneAndDelete({ _id: req.params.id, userId });
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        // Restore Stock
        await adjustStock(userId, invoice.items, 1, invoice.invoiceNo, 'Invoice');

        // Reverse Financial Ledger entries
        await reverseLedgerRecord({ userId, partyId: invoice.partyId, amount: invoice.totalAmount, type: 'Sale' });
        if (invoice.paidAmount > 0) {
            await reverseLedgerRecord({ userId, partyId: invoice.partyId, amount: invoice.paidAmount, type: 'Payment_In' });
        }

        // Delete associated VAT bill
        await VatBillModel.findOneAndDelete({ invoiceId: req.params.id, userId });
        
        res.status(200).json({ success: true, message: 'Invoice deleted and balances restored' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = { ...req.body };
        
        const oldInvoice = await InvoiceModel.findOne({ _id: req.params.id, userId });
        if (!oldInvoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        // 1. Revert Old Balances/Stock
        await adjustStock(userId, oldInvoice.items, 1, oldInvoice.invoiceNo, 'Invoice');
        await reverseLedgerRecord({ userId, partyId: oldInvoice.partyId, amount: oldInvoice.totalAmount, type: 'Sale' });
        if (oldInvoice.paidAmount > 0) {
            await reverseLedgerRecord({ userId, partyId: oldInvoice.partyId, amount: oldInvoice.paidAmount, type: 'Payment_In' });
        }

        const total = updateData.totalAmount !== undefined ? Number(updateData.totalAmount) : oldInvoice.totalAmount;
        const paid = updateData.paidAmount !== undefined ? Number(updateData.paidAmount) : oldInvoice.paidAmount;
        
        if (paid >= total) updateData.status = 'Paid';
        else if (paid > 0) updateData.status = 'Partial';
        else updateData.status = 'Unpaid';

        const updatedInvoice = await InvoiceModel.findOneAndUpdate(
            { _id: req.params.id, userId },
            { $set: updateData },
            { new: true }
        );

        // 2. Apply New Balances/Stock
        await adjustStock(userId, updatedInvoice.items, -1, updatedInvoice.invoiceNo, 'Invoice');
        await syncLedgerRecord({
            userId,
            partyId: updatedInvoice.partyId,
            amount: updatedInvoice.totalAmount,
            type: 'Sale',
            mode: 'None',
            referenceId: updatedInvoice._id,
            name: `Sale Updated (Invoice: ${updatedInvoice.invoiceNo})`,
            remarks: updatedInvoice.notes
        });
        if (updatedInvoice.paidAmount > 0) {
            await syncLedgerRecord({
                userId,
                partyId: updatedInvoice.partyId,
                amount: updatedInvoice.paidAmount,
                type: 'Payment_In',
                mode: updatedInvoice.paymentMode,
                referenceId: updatedInvoice._id,
                name: `Payment Updated (Invoice: ${updatedInvoice.invoiceNo})`,
                remarks: 'Auto-recorded during update'
            });
        }

        // Sync VAT Bill on update
        await syncVatBill(updatedInvoice, userId);

        res.status(200).json({ success: true, message: 'Invoice updated and finance records recalculated', invoice: updatedInvoice });
    } catch (err) {
        console.error('Update Invoice Error:', err);
        res.status(400).json({ success: false, message: err.message || 'Failed to update invoice' });
    }
};

module.exports = {
    createInvoice,
    getMyInvoices,
    getInvoiceById,
    deleteInvoice,
    updateInvoice
};

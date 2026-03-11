const PurchaseModel = require('../models/Purchase');
const ProductModel = require('../models/Product');
const logActivity = require('../utils/logger');
const { adjustStock } = require('../utils/inventory');
const { syncLedgerRecord, reverseLedgerRecord } = require('../utils/ledger');


const createPurchase = async (req, res) => {
    try {
        const { partyId, partyName, purchaseNo, purchaseDate, items, subTotal, totalAmount, notes, paymentMode, status } = req.body;
        const userId = req.user._id;

        const newPurchase = new PurchaseModel({
            userId,
            partyId,
            partyName,
            purchaseNo,
            purchaseDate,
            items,
            subTotal,
            totalAmount,
            notes,
            paymentMode,
            status: status || 'PAID'
        });
        await newPurchase.save();

        // 1. Increment stock
        await adjustStock(userId, items, 1, purchaseNo, 'Purchase');

        await syncLedgerRecord({
            userId,
            partyId,
            amount: totalAmount,
            type: 'Purchase',
            mode: 'None',
            referenceId: newPurchase._id,
            name: `Purchase (Bill: ${purchaseNo})`,
            remarks: notes
        });

        if (status === 'PAID' || status === 'Paid') {
            await syncLedgerRecord({
                userId,
                partyId,
                amount: totalAmount,
                type: 'Payment_Out',
                mode: paymentMode || 'Cash',
                referenceId: newPurchase._id,
                name: `Payment Made (Bill: ${purchaseNo})`,
                remarks: 'Auto-recorded during purchase entry'
            });
        }

        await logActivity(
            userId,
            'CREATE',
            'Purchase',
            purchaseNo,
            `Created purchase bill from ${partyName} (Total: Rs ${totalAmount})`
        );

        res.status(201).json({
            success: true,
            message: 'Purchase recorded, stock added and ledger updated',
            purchase: newPurchase
        });
    } catch (err) {
        console.error('Create Purchase Error:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getMyPurchases = async (req, res) => {
    try {
        const purchases = await PurchaseModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            purchases
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deletePurchase = async (req, res) => {
    try {
        const userId = req.user._id;
        const purchase = await PurchaseModel.findOneAndDelete({ _id: req.params.id, userId });
        if (!purchase) {
            return res.status(404).json({ success: false, message: 'Purchase not found' });
        }

        // Restore Stock
        await adjustStock(userId, purchase.items, -1, purchase.purchaseNo, 'Purchase');

        // Reverse Financial Ledger
        await reverseLedgerRecord({ userId, partyId: purchase.partyId, amount: purchase.totalAmount, type: 'Purchase' });
        if (purchase.status === 'PAID' || purchase.status === 'Paid') {
            await reverseLedgerRecord({ userId, partyId: purchase.partyId, amount: purchase.totalAmount, type: 'Payment_Out' });
        }

        res.status(200).json({ success: true, message: 'Purchase deleted and balances restored' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getPurchaseById = async (req, res) => {
    try {
        const purchase = await PurchaseModel.findOne({ _id: req.params.id, userId: req.user._id });
        if (!purchase) {
            return res.status(404).json({ success: false, message: 'Purchase not found' });
        }
        res.status(200).json({ success: true, purchase });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updatePurchase = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = { ...req.body };
        
        const oldPurchase = await PurchaseModel.findOne({ _id: req.params.id, userId });
        if (!oldPurchase) {
            return res.status(404).json({ success: false, message: 'Purchase not found' });
        }

        // 1. Revert Old Balances/Stock
        await adjustStock(userId, oldPurchase.items, -1, oldPurchase.purchaseNo, 'Purchase');
        await reverseLedgerRecord({ userId, partyId: oldPurchase.partyId, amount: oldPurchase.totalAmount, type: 'Purchase' });
        if (oldPurchase.status === 'PAID' || oldPurchase.status === 'Paid') {
            await reverseLedgerRecord({ userId, partyId: oldPurchase.partyId, amount: oldPurchase.totalAmount, type: 'Payment_Out' });
        }

        const purchase = await PurchaseModel.findOneAndUpdate(
            { _id: req.params.id, userId },
            { $set: updateData },
            { new: true }
        );

        // 2. Apply New Balances/Stock
        await adjustStock(userId, purchase.items, 1, purchase.purchaseNo, 'Purchase');
        await syncLedgerRecord({
            userId,
            partyId: purchase.partyId,
            amount: purchase.totalAmount,
            type: 'Purchase',
            mode: 'None',
            referenceId: purchase._id,
            name: `Purchase Updated (Bill: ${purchase.purchaseNo})`,
            remarks: purchase.notes
        });
        if (purchase.status === 'PAID' || purchase.status === 'Paid') {
            await syncLedgerRecord({
                userId,
                partyId: purchase.partyId,
                amount: purchase.totalAmount,
                type: 'Payment_Out',
                mode: purchase.paymentMode || 'Cash',
                referenceId: purchase._id,
                name: `Payment Updated (Bill: ${purchase.purchaseNo})`,
                remarks: 'Auto-recorded during update'
            });
        }

        res.status(200).json({ success: true, message: 'Purchase updated and finances recalculated', purchase });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    createPurchase,
    getMyPurchases,
    deletePurchase,
    getPurchaseById,
    updatePurchase
};

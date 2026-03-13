const TransactionModel = require('../models/Transaction');
const PartyModel = require('../models/Party');
const { syncLedgerRecord } = require('../utils/ledger');

const createTransaction = async (req, res) => {
    try {
        const { partyId, amount, type, mode, remarks, date } = req.body;
        const userId = req.user._id;

        const party = await PartyModel.findOne({ _id: partyId, userId });
        if (!party) {
            return res.status(404).json({ success: false, message: 'Party not found' });
        }

        // Use the ledger utility to sync balance and log record
        const balanceAfter = await syncLedgerRecord({
            userId,
            partyId,
            amount,
            type, // Payment_In or Payment_Out
            mode,
            name: type === 'Payment_In' ? `Payment Received from ${party.name}` : `Payment Made to ${party.name}`,
            remarks,
            referenceId: null // Manual payments might not have a direct doc ref
        });

        res.status(201).json({
            success: true,
            message: 'Transaction recorded and balance updated',
            balanceAfter
        });
    } catch (err) {
        console.error('Create Transaction Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getPartyTransactions = async (req, res) => {
    try {
        const { partyId } = req.params;
        const transactions = await TransactionModel.find({ 
            userId: req.user._id, 
            partyId 
        }).sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, transactions });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionModel.find({ 
            userId: req.user._id 
        }).sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, transactions });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    createTransaction,
    getPartyTransactions,
    getAllTransactions
};

const PartyModel = require('../models/Party');
const TransactionModel = require('../models/Transaction');

/**
 * syncLedgerRecord - Updates party balance and logs a transaction record.
 * @param {Object} params - { userId, partyId, amount, type, mode, referenceId, name, remarks }
 */
const syncLedgerRecord = async ({ userId, partyId, amount, type, mode = 'None', referenceId, name, remarks }) => {
    try {
        const party = await PartyModel.findOne({ _id: partyId, userId });
        if (!party) return;

        
        let adjustment = 0;
        if (type === 'Sale' || type === 'Payment_Out' || type === 'Opening_Balance') {
            adjustment = amount;
        } else if (type === 'Purchase' || type === 'Payment_In') {
            adjustment = -amount;
        }

        const updatedParty = await PartyModel.findOneAndUpdate(
            { _id: partyId, userId },
            { 
                $inc: { balance: adjustment },
                // Set status based on the new balance (calculated by MongoDB)
                $set: { status: (adjustment >= 0 ? 'Receivable' : 'Payable') } 
                // Note: accurate status might need a second step or checking result, 
                // but for balance, $inc is key.
            },
            { new: true }
        );

        if (!updatedParty) return;

        const transaction = new TransactionModel({
            userId,
            partyId,
            partyName: party.name,
            name,
            amount,
            type,
            mode,
            referenceId,
            balanceAfter: Math.abs(party.balance),
            status: 'Completed',
            remarks
        });

        await transaction.save();
        return party.balance;
    } catch (err) {
        console.error('Ledger Sync Error:', err);
    }
};


const reverseLedgerRecord = async ({ userId, partyId, amount, type }) => {
    try {
        const party = await PartyModel.findOne({ _id: partyId, userId });
        if (!party) return;

        let adjustment = 0;
        if (type === 'Sale' || type === 'Payment_Out' || type === 'Opening_Balance') {
            adjustment = -amount; // Reverse positive
        } else if (type === 'Purchase' || type === 'Payment_In') {
            adjustment = amount; // Reverse negative
        }

        // Use atomic $inc to prevent race conditions during reversal
        await PartyModel.findOneAndUpdate(
            { _id: partyId, userId },
            { $inc: { balance: adjustment } }
        );
        return;
    } catch (err) {
        console.error('Ledger Reverse Error:', err);
    }
};

const calculateRunningBalance = (transactions, initialBalance = 0) => {
    let currentBalance = initialBalance;
    return transactions.map(t => {
        if (t.amount === undefined || t.amount === null) {
            throw new Error("Transaction amount is required");
        }
        if (t.amount < 0) {
            throw new Error("Transaction amount cannot be negative");
        }
        let adjustment = 0;
        if (t.type === 'Sale' || t.type === 'Payment_Out' || t.type === 'Opening_Balance' || t.type === 'Debit') {
            adjustment = t.amount;
        } else if (t.type === 'Purchase' || t.type === 'Payment_In' || t.type === 'Credit') {
            adjustment = -t.amount;
        }
        currentBalance += adjustment;
        return { ...t, runningBalance: currentBalance };
    });
};

module.exports = {
    syncLedgerRecord,
    reverseLedgerRecord,
    calculateRunningBalance
};

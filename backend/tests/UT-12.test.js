const { calculateRunningBalance } = require('../utils/ledger');

describe('UT-12: Transaction Amount Validation Test', () => {
    test('Check that the ledger calculation stops and shows an error if a transaction has no amount', () => {
        const mockTransactions = [
            { type: 'Debit', amount: 1000 },
            { type: 'Credit' }, // Missing amount field
            { type: 'Debit', amount: 200 }
        ];

        expect(() => {
            calculateRunningBalance(mockTransactions, 0);
        }).toThrow("Transaction amount is required");
    });
});

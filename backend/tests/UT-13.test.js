const { calculateRunningBalance } = require('../utils/ledger');

describe('UT-13: Negative Transaction Amount Validation Test', () => {
    test('Check that the ledger rejects any transaction that has a negative amount entered', () => {
        const mockTransactions = [
            { type: 'Debit', amount: 1000 },
            { type: 'Credit', amount: -200 }, // Negative amount
            { type: 'Debit', amount: 500 }
        ];

        expect(() => {
            calculateRunningBalance(mockTransactions, 0);
        }).toThrow("Transaction amount cannot be negative");
    });
});

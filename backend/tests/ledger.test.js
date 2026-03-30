const { calculateRunningBalance } = require('../utils/ledger');

describe('Ledger Calculations - Prototype 6', () => {
    test('calculateRunningBalance() should correctly compute cumulative balances', () => {
        // Mock array of three transactions
        const mockTransactions = [
            { type: 'Sale', amount: 1000, name: 'Initial Sale' },      // Balance: 1000
            { type: 'Payment_In', amount: 500, name: 'Customer Paid' }, // Balance: 1000 - 500 = 500
            { type: 'Sale', amount: 200, name: 'Additional Sale' }     // Balance: 500 + 200 = 700
        ];

        const results = calculateRunningBalance(mockTransactions, 0);

        // Assertions for each transaction entry
        expect(results[0].runningBalance).toBe(1000);
        expect(results[1].runningBalance).toBe(500);
        expect(results[2].runningBalance).toBe(700);

        // Verify the array structure remains intact
        expect(results).toHaveLength(3);
        expect(results[0].name).toBe('Initial Sale');
    });
});

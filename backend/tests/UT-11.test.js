const { calculateRunningBalance } = require('../utils/ledger');

describe('UT-11: Running Balance Calculation Test', () => {
    test('Check that the running balance calculates correctly across transactions', () => {
        const mockTransactions = [
            { type: 'Debit', amount: 1000 },
            { type: 'Credit', amount: 500 },
            { type: 'Debit', amount: 200 }
        ];

        const results = calculateRunningBalance(mockTransactions, 0);

        // Assertions
        expect(results[0].runningBalance).toBe(1000); // 0 + 1000
        expect(results[1].runningBalance).toBe(500);  // 1000 - 500
        expect(results[2].runningBalance).toBe(700);  // 500 + 200
    });
});

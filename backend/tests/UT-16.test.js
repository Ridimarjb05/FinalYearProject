const { calculatePnL } = require('../utils/finance');

describe('UT-16: Profit and Loss Validation Test', () => {
    test('Check that the profit and loss report refuses to generate when important figures are missing', () => {
        // Missing totalCOGS
        expect(() => {
            calculatePnL(50000, undefined, 5000);
        }).toThrow("All financial fields are required");
        
        // Missing totalSales
        expect(() => {
            calculatePnL(undefined, 20000, 5000);
        }).toThrow("All financial fields are required");

        // Missing totalExpenses
        expect(() => {
            calculatePnL(50000, 20000, undefined);
        }).toThrow("All financial fields are required");
    });
});

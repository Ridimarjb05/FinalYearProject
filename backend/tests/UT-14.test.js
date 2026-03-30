const { calculatePnL } = require('../utils/finance');

describe('UT-14: Profit and Loss Calculation Test', () => {
    test('Check that the profit and loss report gives the correct net profit figure', () => {
        const totalSales = 50000;
        const totalCOGS = 20000;
        const totalExpenses = 5000;

        const result = calculatePnL(totalSales, totalCOGS, totalExpenses);

        expect(result).toEqual({
            grossProfit: 30000,
            netProfit: 25000
        });
    });
});

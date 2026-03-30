const { calculatePnL } = require('../utils/finance');

describe('UT-15: Profit and Loss Net Loss Test', () => {
    test('Check that the profit and loss report correctly shows a loss when expenses are higher than income', () => {
        const totalSales = 5000;
        const totalCOGS = 3000;
        const totalExpenses = 4000;

        const result = calculatePnL(totalSales, totalCOGS, totalExpenses);

        expect(result).toEqual({
            grossProfit: 2000,
            netProfit: -2000
        });
    });
});

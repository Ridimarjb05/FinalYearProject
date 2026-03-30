const { calculateVAT } = require('../utils/tax');

describe('UT-09: VAT Calculation Test', () => {
    test('Check that the VAT calculation gives the right tax amount and final total', () => {
        const subtotal = 1000;
        const vatRate = 13;
        
        const result = calculateVAT(subtotal, vatRate);
        
        expect(result).toEqual({
            vatAmount: 130,
            netTotal: 1130
        });
    });
});

const { calculateVAT } = require('../utils/tax');

describe('UT-10: VAT Calculation Verification Test', () => {
    test('Check that the VAT calculation gives the right tax amount and final total for Rs.1000', () => {
        const subtotal = 1000;
        const vatRate = 13;
        
        const result = calculateVAT(subtotal, vatRate);
        
        expect(result).toEqual({
            vatAmount: 130,
            netTotal: 1130
        });
    });
});

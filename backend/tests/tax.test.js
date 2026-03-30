const { calculateVAT } = require('../utils/tax');

describe('Tax Utility - calculateVAT()', () => {
    
    test('Scenario: Calculate 13% VAT on 1000 subtotal', () => {
        const subtotal = 1000;
        const vatRate = 13;

        const result = calculateVAT(subtotal, vatRate);

        // Verification
        expect(result.vatAmount).toBe(130);
        expect(result.netTotal).toBe(1130);
    });

    test('Scenario: Handle decimal subtotals', () => {
        const result = calculateVAT(150.50, 13);
        
        expect(result.vatAmount).toBe(19.57);
        expect(result.netTotal).toBe(170.07);
    });
});

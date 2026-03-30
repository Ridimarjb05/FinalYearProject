const { validateSKU } = require('../utils/inventory');
const ProductModel = require('../models/Product');

jest.mock('../models/Product', () => ({
    findOne: jest.fn()
}));

describe('UT-06: SKU Availability Test', () => {
    test('Check that a brand-new SKU that has never been used before is accepted by the system', async () => {
        ProductModel.findOne.mockImplementation(({ sku }) => {
            if (sku === 'SKU-001' || sku === 'SKU-002') {
                return Promise.resolve({ sku });
            }
            return Promise.resolve(null);
        });

        const isAvailable = await validateSKU('SKU-999');
        
        expect(isAvailable).toBe(true);
        expect(ProductModel.findOne).toHaveBeenCalledWith({ sku: 'SKU-999' });
    });
});

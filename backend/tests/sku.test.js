const { validateSKU } = require('../utils/inventory');
const ProductModel = require('../models/Product');

// MOCKING: This replaces the real ProductModel.findOne with a fake function
jest.mock('../models/Product', () => ({
    findOne: jest.fn()
}));

describe('UT-06: SKU Validation Unit Tests', () => {

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

    test('Check that the system rejects a SKU that is already being used by another product', async () => {
        // Mocking the database to contain SKU-001
        ProductModel.findOne.mockImplementation(({ sku }) => {
            if (sku === 'SKU-001') {
                return Promise.resolve({ sku: 'SKU-001', name: 'Existing Product' });
            }
            return Promise.resolve(null);
        });

        await expect(validateSKU('SKU-001')).rejects.toThrow("SKU already exists");
        expect(ProductModel.findOne).toHaveBeenCalledWith({ sku: 'SKU-001' });
    });
});

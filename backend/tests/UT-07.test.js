const { validateSKU } = require('../utils/inventory');
const ProductModel = require('../models/Product');

jest.mock('../models/Product', () => ({
    findOne: jest.fn()
}));

describe('UT-07: SKU Duplicate Rejection Test', () => {
    test('Check that the system rejects a SKU that is already being used by another product', async () => {
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

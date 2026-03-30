const { adjustStock, deductStock } = require('../utils/inventory');
const ProductModel = require('../models/Product');

jest.mock('../models/Product', () => ({
    findOneAndUpdate: jest.fn().mockResolvedValue(true)
}));

describe('UT-04: Stock Adjustment Unit Tests', () => {
    test('Check that selling a product correctly decreases its stock quantity by the sold amount', () => {
        const mockProduct = {
            productId: 'P001',
            name: 'Test Product',
            quantity: 100
        };

        const updatedProduct = deductStock(mockProduct, 1);
        expect(updatedProduct.quantity).toBe(99);
    });
});

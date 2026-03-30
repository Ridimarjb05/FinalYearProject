const { adjustStock, deductStock } = require('../utils/inventory');
const ProductModel = require('../models/Product');

jest.mock('../models/Product', () => ({
    findOneAndUpdate: jest.fn().mockResolvedValue(true)
}));

describe('UT-04: Stock Adjustment Unit Tests', () => {
    
    test('Check that selling a product correctly decreases its stock quantity by the sold amount', () => {
        // Mock a product with currentStock: 100
        const mockProduct = {
            productId: 'P001',
            name: 'Test Product',
            quantity: 100
        };

        // Call deductStock with quantity 1
        const updatedProduct = deductStock(mockProduct, 1);

        // Assert that currentStock is 99
        expect(updatedProduct.quantity).toBe(99);
    });

    test('Should correctly increase product quantity when stock is added', async () => {
        // MOCK DATA: A fake purchase item
        const userId = 'user123';
        const items = [{ productId: 'prod_99', quantity: 50 }];
        const multiplier = 1; // +1 for Adding Stock (Purchase)

        await adjustStock(userId, items, multiplier);

        expect(ProductModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: 'prod_99', userId: 'user123' },
            { $inc: { quantity: 50 } } 
        );
    });

    test('Should correctly decrease product quantity when stock is sold', async () => {
        // MOCK DATA: A fake sales item
        const userId = 'user123';
        const items = [{ productId: 'prod_99', quantity: 20 }];
        const multiplier = -1; // -1 for Selling Stock (Sales)

        // EXECUTE the logic
        await adjustStock(userId, items, multiplier);

        // VERIFICATION
        // We verify that the database update was called with a negative increment (-20)
        expect(ProductModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: 'prod_99', userId: 'user123' },
            { $inc: { quantity: -20 } } 
        );
    });
});

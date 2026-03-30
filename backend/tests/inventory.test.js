const { getLowStockProducts } = require('../utils/inventory');

// Mocking the ProductModel because we only want to test the logic
jest.mock('../models/Product', () => ({}));

describe('Inventory Utility - getLowStockProducts', () => {
    
    test('Scenario: Identifying products below minimum threshold', () => {
        const mockProducts = [
            { name: 'Product A', quantity: 3, minStock: 5 },   
            { name: 'Product B', quantity: 100, minStock: 10 }, 
            { name: 'Product C', quantity: 2, minStock: 5 }   
        ];

        const result = getLowStockProducts(mockProducts);

        // Verification
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Product A');
        expect(result[1].name).toBe('Product C');
        
        // Ensure Product B was correctly excluded
        const hasProductB = result.some(p => p.name === 'Product B');
        expect(hasProductB).toBe(false);
    });

    test('Scenario: Handle products with no minStock defined (default to 5)', () => {
        const mockProducts = [
            { name: 'No MinStock Set', quantity: 4 } // 4 <= 5 (default) -> LOW
        ];

        const result = getLowStockProducts(mockProducts);
        expect(result).toHaveLength(1);
    });
});

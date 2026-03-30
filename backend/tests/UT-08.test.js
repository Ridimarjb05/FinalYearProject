const { getLowStockProducts } = require('../utils/inventory');
const { mockProducts } = require('./mockData');

describe('UT-08: Low Stock Alert Filtering Test', () => {
    test('Check that the low stock alert only shows products that are running low', () => {
        const lowStockResult = getLowStockProducts(mockProducts);
        
        // Assert that the length is 2 (Product A and Product C)
        expect(lowStockResult).toHaveLength(2);
        
        // Assert that Product A and Product C are present
        const names = lowStockResult.map(p => p.name);
        expect(names).toContain('Product A');
        expect(names).toContain('Product C');
        
        // Assert that Product B is NOT present
        expect(names).not.toContain('Product B');
    });
});

const { hashPassword } = require('../utils/auth');

describe('UT-01: hashPassword() encryption', () => {
    test('Verify that hashPassword() successfully encrypts a plain text password using bcrypt', async () => {
        const password = 'plainSecret123';
        const hash = await hashPassword(password);
        
        expect(hash).toBeDefined();
        expect(hash).not.toBe(password);
        expect(hash.startsWith('$2b$')).toBe(true);
    });
});

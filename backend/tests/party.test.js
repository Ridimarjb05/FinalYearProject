const { partyCreateValidation } = require('../middlewares/PartyValidation');

describe('Party Validation Unit Tests (Joi Schema)', () => {
    let mockReq;
    let mockRes;
    let nextFunction;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        nextFunction = jest.fn();
    });

    test('UT-03: Should pass validation for a fully  valid party object', () => {
        // MOCK DATA: A perfect party object
        mockReq.body = {
            name: "John Doe Traders",
            type: "Customer",
            phone: "9841000000",
            balance: 500,
            status: "Receivable",
            address: "New Road, Kathmandu",
            notes: "Regular customer"
        };

        partyCreateValidation(mockReq, mockRes, nextFunction);

        // EXPECTATION: next() should be called, meaning validation passed
        expect(nextFunction).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    test('UT-04: Should fail validation if the mandatory "name" field is missing', () => {
        // MOCK DATA: Missing the 'name' field
        mockReq.body = {
            type: "Supplier",
            phone: "9841111111",
            balance: 0
        };

        partyCreateValidation(mockReq, mockRes, nextFunction);

        // EXPECTATION: status(400) should be called, and next() should NOT be called
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            error: '"name" is required'
        }));
        expect(nextFunction).not.toHaveBeenCalled();
    });

    test('UT-05: Should fail validation if "type" is invalid', () => {
        // MOCK DATA: Invalid type 'Individual' (only Customer/Supplier/Bank allowed)
        mockReq.body = {
            name: "Invalid Party",
            type: "Individual" 
        };

        partyCreateValidation(mockReq, mockRes, nextFunction);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
            error: expect.stringContaining('"type" must be one of')
        }));
    });
});

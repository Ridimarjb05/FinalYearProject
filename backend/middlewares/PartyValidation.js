const Joi = require('joi');

const partyCreateValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(120).required(),
        type: Joi.string().valid('Customer', 'Supplier', 'Bank').required(),
        phone: Joi.string().allow('', null),
        balance: Joi.number().min(0).allow(null, ''),
        status: Joi.string().valid('Payable', 'Receivable').allow('', null),
        address: Joi.string().allow('', null),
        notes: Joi.string().allow('', null)
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: 'Bad Request', 
            error: error.details[0].message 
        });
    }
    next();
};

const partyUpdateValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(120).optional(),
        type: Joi.string().valid('Customer', 'Supplier', 'Bank').optional(),
        phone: Joi.string().allow('', null).optional(),
        balance: Joi.number().min(0).allow(null, '').optional(),
        status: Joi.string().valid('Payable', 'Receivable').allow('', null).optional(),
        address: Joi.string().allow('', null).optional(),
        notes: Joi.string().allow('', null).optional()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: error.details[0].message, 
            error: error.details[0].message 
        });
    }
    next();
};

module.exports = {
    partyCreateValidation,
    partyUpdateValidation
};

const Joi = require('joi');

const productCreateValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(120).required(),
        sku: Joi.string().allow('', null),
        quantity: Joi.number().min(0).required(),
        unitPrice: Joi.number().min(0).required(),
        purchasePrice: Joi.number().min(0).allow(null, ''),
        category: Joi.string().allow('', null),
        ageGroup: Joi.string().allow('', null),
        gender: Joi.string().valid('Boy', 'Girl', 'Unisex').allow('', null),
        minStock: Joi.number().min(0).allow(null, '')
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
};

module.exports = {
    productCreateValidation
};

const Joi = require('joi');

const transactionCreateValidation = (req, res, next) => {
    const schema = Joi.object({
        partyId: Joi.string().required(),
        name: Joi.string().min(2).max(120).required(),
        amount: Joi.number().required(),
        status: Joi.string().valid('Paid', 'Pending').required(),
        type: Joi.string().valid('Sale', 'Purchase', 'Payment_In', 'Payment_Out', 'Opening_Balance').required(),
        date: Joi.date().optional(),
        remarks: Joi.string().allow('', null).optional()
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

module.exports = {
    transactionCreateValidation
};

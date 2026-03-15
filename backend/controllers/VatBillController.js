const VatBillModel = require('../models/VatBill');

const getMyVatBills = async (req, res) => {
    try {
        const bills = await VatBillModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            bills
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getVatBillById = async (req, res) => {
    try {
        const bill = await VatBillModel.findOne({ _id: req.params.id, userId: req.user._id });
        if (!bill) {
            return res.status(404).json({ success: false, message: 'VAT Bill not found' });
        }
        res.status(200).json({ success: true, bill });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getVatBillByInvoiceId = async (req, res) => {
    try {
        const bill = await VatBillModel.findOne({ invoiceId: req.params.invoiceId, userId: req.user._id });
        if (!bill) {
            return res.status(404).json({ success: false, message: 'VAT Bill for this invoice not found' });
        }
        res.status(200).json({ success: true, bill });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    getMyVatBills,
    getVatBillById,
    getVatBillByInvoiceId
};

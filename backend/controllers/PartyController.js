const PartyModel = require('../models/Party');
const logActivity = require('../utils/logger');
const XLSX = require('xlsx');

const createParty = async (req, res) => {
    try {
        const { name, type, phone, balance, status, address, notes } = req.body;
        const party = new PartyModel({
            userId: req.user._id,
            name,
            type,
            phone,
            balance,
            status,
            address,
            notes
        });
        await party.save();

        await logActivity(req.user._id, 'CREATE', 'Party', name, `Added new ${type}: ${name}`);

        res.status(201).json({
            success: true,
            message: 'Party created',
            party
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const listMyParties = async (req, res) => {
    try {
        const parties = await PartyModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            parties
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getMyParty = async (req, res) => {
    try {
        const { id } = req.params;
        const party = await PartyModel.findOne({ _id: id, userId: req.user._id });
        if (!party) {
            return res.status(404).json({
                success: false,
                message: 'Party not found'
            });
        }
        res.status(200).json({
            success: true,
            party
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const updateParty = async (req, res) => {
    try {
        const { id } = req.params;
        
        const updateData = {};
        const fields = ['name', 'type', 'phone', 'balance', 'status', 'address', 'notes'];
        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const party = await PartyModel.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { $set: updateData },
            { new: true }
        );

        if (!party) {
            return res.status(404).json({
                success: false,
                message: 'Party not found'
            });
        }

        await logActivity(req.user._id, 'UPDATE', 'Party', party.name, `Updated details for ${party.type}: ${party.name}`);

        res.status(200).json({
            success: true,
            message: 'Party updated',
            party
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deleteParty = async (req, res) => {
    try {
        const { id } = req.params;
        
        const party = await PartyModel.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!party) {
            return res.status(404).json({
                success: false,
                message: 'Party not found'
            });
        }

        await logActivity(req.user._id, 'DELETE', 'Party', party.name, `Deleted ${party.type}: ${party.name}`);

        res.status(200).json({
            success: true,
            message: 'Party deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const exportParties = async (req, res) => {
    try {
        const parties = await PartyModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        
        const dataToExport = parties.map((p, index) => ({
            'S.N.': index + 1,
            'Party Name': p.name,
            'Type': p.type || '-',
            'Phone': p.phone || '-',
            'Balance': Number(p.balance || 0),
            'Status': p.status || 'Receivable',
            'Registered At': new Date(p.createdAt).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Parties");

        worksheet['!cols'] = [
            { wch: 5 }, { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 }
        ];

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        const filename = `Parties_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.status(200).send(buffer);
        
    } catch (err) {
        res.status(500).json({ success: false, message: 'Export failed' });
    }
};

module.exports = {
    createParty,
    listMyParties,
    getMyParty,
    updateParty,
    deleteParty,
    exportParties
};

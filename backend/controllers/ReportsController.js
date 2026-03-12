const InvoiceModel = require('../models/Invoice');
const PurchaseModel = require('../models/Purchase');
const ExpenseModel = require('../models/Expense');
const ProductModel = require('../models/Product');
const mongoose = require('mongoose');

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const [sales, purchases, expenses, lowStock] = await Promise.all([
            InvoiceModel.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]),
            PurchaseModel.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]),
            ExpenseModel.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            ProductModel.countDocuments({ userId, quantity: { $lte: 5 } }) 
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalSales: sales[0]?.total || 0,
                totalPurchases: purchases[0]?.total || 0,
                totalExpenses: expenses[0]?.total || 0,
                lowStockCount: lowStock
            }
        });
    } catch (err) {
        console.error('Stats Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getSalesTrend = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Last 6 months trend
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const trend = await InvoiceModel.aggregate([
            { 
                $match: { 
                    userId: new mongoose.Types.ObjectId(userId),
                    invoiceDate: { $gte: sixMonthsAgo }
                } 
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$invoiceDate" } },
                    amount: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json({ success: true, trend });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getInventorySummary = async (req, res) => {
    try {
        const userId = req.user._id;

        const summary = await ProductModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    totalStock: { $sum: "$quantity" },
                    totalValue: { $sum: { $multiply: ["$quantity", "$purchasePrice"] } }
                }
            }
        ]);

        res.status(200).json({ success: true, summary });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getProfitLoss = async (req, res) => {
    try {
        const userId = req.user._id;
        const { startDate, endDate } = req.query;

        const start = startDate ? new Date(startDate) : new Date('2000-01-01');
        const end = endDate ? new Date(endDate) : new Date();
        end.setHours(23, 59, 59, 999); // Include full end date

        const [sales, expenses] = await Promise.all([
            InvoiceModel.aggregate([
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(userId),
                        invoiceDate: { $gte: start, $lte: end }
                    }
                },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            ExpenseModel.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(userId),
                        date: { $gte: start, $lte: end }
                    }
                },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ]);

        const totalSales = sales[0]?.total || 0;
        const totalExpenses = expenses[0]?.total || 0;
        const netProfit = totalSales - totalExpenses;

        res.status(200).json({
            success: true,
            report: {
                totalSales,
                totalExpenses,
                netProfit,
                startDate: start,
                endDate: end
            }
        });
    } catch (err) {
        console.error('P&L Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    getDashboardStats,
    getSalesTrend,
    getInventorySummary,
    getProfitLoss
};

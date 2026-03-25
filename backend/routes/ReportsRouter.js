const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/Auth');
const { 
    getDashboardStats, 
    getSalesTrend, 
    getInventorySummary,
    getProfitLoss
} = require('../controllers/ReportsController');

router.get('/stats', ensureAuthenticated, getDashboardStats);
router.get('/sales-trend', ensureAuthenticated, getSalesTrend);
router.get('/inventory-summary', ensureAuthenticated, getInventorySummary);
router.get('/profit-loss', ensureAuthenticated, getProfitLoss);


module.exports = router;

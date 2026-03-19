const ensureAuthenticated = require('../middlewares/Auth');
const { getAuditLogs } = require('../controllers/HistoryController');

const router = require('express').Router();

router.get('/', ensureAuthenticated, getAuditLogs);

module.exports = router;

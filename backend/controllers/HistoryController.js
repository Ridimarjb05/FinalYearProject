const AuditLogModel = require('../models/AuditLog');

const getAuditLogs = async (req, res) => {
    try {
        const { resource, resourceName, action, startDate, endDate } = req.query;
        let query = { userId: req.user._id };
        
        if (resource) query.resource = resource;
        if (resourceName) query.resourceName = resourceName;
        if (action) query.action = action;

        // Date Range Filtering
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate && startDate !== 'undefined') {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate && endDate !== 'undefined') {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                query.createdAt.$lte = end;
            }
            // If the date object is invalid, remove the filter
            if (Object.keys(query.createdAt).length === 0) {
                delete query.createdAt;
            }
        }

        console.log("Final History Query:", JSON.stringify(query));

        const logs = await AuditLogModel.find(query)
            .sort({ createdAt: -1 })
            .limit(100);
            
        res.status(200).json({
            success: true,
            logs
        });
    } catch (err) {
        console.error('Get Audit Logs Error:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    getAuditLogs
};

const AuditLogModel = require('../models/AuditLog');

const logActivity = async (userId, action, resource, resourceName, details = '', oldValue = null, newValue = null, field = '') => {
    try {
        const log = new AuditLogModel({
            userId,
            action,
            resource,
            resourceName,
            details,
            oldValue,
            newValue,
            field
        });
        await log.save();
    } catch (err) {
        console.error('Audit Log Error:', err);
    }
};

module.exports = logActivity;

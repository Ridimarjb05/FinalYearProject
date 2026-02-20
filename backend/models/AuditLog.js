const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditLogSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        action: {
            type: String, 
            required: true
        },
        resource: {
            type: String, 
            required: true
        },
        resourceName: {
            type: String, 
            required: true
        },
        details: {
            type: String 
        },
        oldValue: {
            type: Schema.Types.Mixed
        },
        newValue: {
            type: Schema.Types.Mixed
        },
        field: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const AuditLogModel = mongoose.model('audit_logs', AuditLogSchema);
module.exports = AuditLogModel;

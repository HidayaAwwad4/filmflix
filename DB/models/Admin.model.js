import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin'],
        default: 'admin',
    },
    status: {
        type: String,
        enum: ['active', 'not_active'],
        default: 'active',
    },
}, {
    timestamps: true,
});

const adminModel = mongoose.model('Admin', adminSchema);
export default adminModel;

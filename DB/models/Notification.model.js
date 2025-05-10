import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Info', 'Warning', 'Error'],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

const notificationModel = mongoose.model('Notification', notificationSchema);
export default notificationModel;

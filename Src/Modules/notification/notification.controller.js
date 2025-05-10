import notificationModel from '../../../DB/models/Notification.model.js';
import { AppError } from '../../../AppError.js';

export const createNotification = async (req, res, next) => {
    const { userId, message, type, date } = req.body;

    try {
        const newNotification = await notificationModel.create({
            userId,
            message,
            type,
            date
        });

        res.status(201).json({ message: "Notification created successfully", notification: newNotification });
    } catch (error) {
        return next(new AppError("Error creating notification", 500));
    }
};

export const getAllNotifications = async (req, res, next) => {
    const { userId } = req.query;
    let query = {};
    if (userId) query.userId = userId;

    try {
        const notifications = await notificationModel.find(query);
        res.status(200).json({ message: "Notifications retrieved successfully", notifications });
    } catch (error) {
        return next(new AppError("Error fetching notifications", 500));
    }
};

export const updateNotification = async (req, res, next) => {
    const { id } = req.params;
    const { message, type, date } = req.body;

    try {
        const updatedNotification = await notificationModel.findByIdAndUpdate(id, { message, type, date }, { new: true });
        if (!updatedNotification) {
            return next(new AppError("Notification not found", 404));
        }
        res.status(200).json({ message: "Notification updated successfully", notification: updatedNotification });
    } catch (error) {
        return next(new AppError("Error updating notification", 500));
    }
};

export const deleteNotification = async (req, res, next) => {
    const { id } = req.params;

    try {
        const notification = await notificationModel.findByIdAndDelete(id);
        if (!notification) {
            return next(new AppError("Notification not found", 404));
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        return next(new AppError("Error deleting notification", 500));
    }
};

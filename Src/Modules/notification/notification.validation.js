import joi from 'joi';

export const createNotificationSchema = {
    body: joi.object({
        userId: joi.string().required(),
        message: joi.string().min(1).required(),
        type: joi.string().valid('Info', 'Warning', 'Error').required(),
        date: joi.date().required()
    })
};

export const updateNotificationSchema = {
    body: joi.object({
        message: joi.string().min(1).optional(),
        type: joi.string().valid('Info', 'Warning', 'Error').optional(),
        date: joi.date().optional()
    })
};

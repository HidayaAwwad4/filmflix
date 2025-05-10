import joi from "joi";

export const addCommentSchema = {
    body: joi.object({
        movieId: joi.string().required(),
        userId: joi.string().required(),
        content: joi.string().min(1).max(1000).required(),
        rating: joi.number().min(1).max(5).required()
    })
};

export const updateCommentSchema = {
    body: joi.object({
        content: joi.string().min(1).max(1000).optional(),
        rating: joi.number().min(1).max(5).optional()
    })
};

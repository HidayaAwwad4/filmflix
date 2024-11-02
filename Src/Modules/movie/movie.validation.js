import joi from "joi";

export const createMovieSchema = {
    body: joi.object({
        title: joi.string().min(1).max(255).required(),
        genre: joi.string().valid('Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary').required(),
        releaseYear: joi.number().integer().min(1888).max(new Date().getFullYear()).required(),
        director: joi.string().trim().min(1).max(255).required(),
        cast: joi.array().items(joi.string()).default([]).optional(), 
        rating: joi.number().min(1).max(5).optional(),
        description: joi.string().min(1).required(),
        duration: joi.number().integer().min(1).required(),
        language: joi.string().min(1).required(),
       // poster: joi.string().uri().required(),
       // videoUrl: joi.string().uri().required(),
    })
};

export const updateMovieSchema = {
    body: joi.object({
        title: joi.string().min(1).max(255).optional(),
        genre: joi.string().valid('Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary').optional(),
        releaseYear: joi.number().integer().min(1888).max(new Date().getFullYear()).optional(),
        director: joi.string().trim().min(1).max(255).optional(),
        cast: joi.array().items(joi.string()).default([]).optional(),
        rating: joi.number().min(1).max(5).optional(),
        description: joi.string().min(1).optional(),
        duration: joi.number().integer().min(1).optional(),
        language: joi.string().min(1).optional(),
        poster: joi.string().uri().optional(),
        videoUrl: joi.string().uri().optional(),
    })
};

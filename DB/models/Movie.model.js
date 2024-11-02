import mongoose, { Schema, Types } from 'mongoose';

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    cast: {
        type: [String],  
        default: [],
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    duration: { 
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    userRatings: [{
        userId: {
            type: Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
    }],
    averageRating: {
        type: Number,
        default: 0,
    },
    poster: { 
        type: String, 
        //required: true,
    },
    videoUrl: { 
        type: String,
        //required: true, 
    },
}, {
    timestamps: true,
});

const movieModel = mongoose.model('Movie', movieSchema);
export default movieModel;

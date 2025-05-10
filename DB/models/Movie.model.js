import mongoose, { Schema, Types } from 'mongoose';

const ratingSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movieId: {
        type: Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, {
    timestamps: true,
});

ratingSchema.index({ userId: 1, movieId: 1 }, { unique: true }); // ممنوع المستخدم يرجع يقيم نفس الفلم

const ratingModel = mongoose.model('Rating', ratingSchema);
export default ratingModel;

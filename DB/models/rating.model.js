import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, {
    timestamps: true
});

const ratingModel = mongoose.model('Rating', ratingSchema);
export default ratingModel;

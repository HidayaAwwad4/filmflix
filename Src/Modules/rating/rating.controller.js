import ratingModel from '../../../DB/models/Rating.model.js';
import movieModel from '../../../DB/models/Movie.model.js';
import { AppError } from '../../../AppError.js';

const updateMovieAverageRating = async (movieId) => {
    const ratings = await ratingModel.find({ movieId });
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    const average = ratings.length ? total / ratings.length : 0;
    await movieModel.findByIdAndUpdate(movieId, { averageRating: average.toFixed(2) });
};

export const addOrUpdateRating = async (req, res, next) => {
    const userId = req.user._id;
    const { movieId, rating } = req.body;

    const movie = await movieModel.findById(movieId);
    if (!movie) {
        return next(new AppError("Movie not found", 404));
    }

    const updatedRating = await ratingModel.findOneAndUpdate(
        { userId, movieId },
        { rating },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    await updateMovieAverageRating(movieId);

    res.status(200).json({
        message: "Rating submitted successfully",
        rating: updatedRating,
    });
};

export const getMovieRatings = async (req, res, next) => {
    const { movieId } = req.params;
    const ratings = await ratingModel.find({ movieId }).populate('userId', 'userName');
    res.status(200).json({ message: "Ratings fetched", ratings });
};

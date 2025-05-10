import userModel from "../../../DB/models/User.model.js";
import movieModel from "../../../DB/models/Movie.model.js";
import {AppError} from "../../../AppError.js";

export const getRecommendations = async (req, res, next) => {
    const userId = req.user._id;

    const user = await userModel.findById(userId);
    if (!user || !user.preferences || user.preferences.length === 0) {
        return next(new AppError("User has no preferences set", 400));
    }

    const movies = await movieModel.find({
        genre: { $in: user.preferences },
        status: 'active',
    });

    res.status(200).json({
        message: "Recommended movies retrieved successfully",
        movies,
    });
};

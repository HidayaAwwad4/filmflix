import commentModel from '../../../DB/models/Comment.model.js';
import { AppError } from '../../../AppError.js';

// إضافة تعليق جديد
export const addComment = async (req, res, next) => {
    const { movieId, userId, content, rating } = req.body;

    try {
        const newComment = await commentModel.create({
            movie: movieId,
            user: userId,
            content,
            rating
        });

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        return next(new AppError("Error adding comment", 500));
    }
};

// الحصول على جميع التعليقات لفيلم معين
export const getCommentsByMovie = async (req, res, next) => {
    const { movieId } = req.params;

    try {
        const comments = await commentModel.find({ movie: movieId }).populate('user', 'userName email');

        if (comments.length === 0) {
            return next(new AppError("No comments found for this movie", 404));
        }

        res.status(200).json({ message: "Comments retrieved successfully", comments });
    } catch (error) {
        return next(new AppError("Error retrieving comments", 500));
    }
};

// تحديث تعليق معين
export const updateComment = async (req, res, next) => {
    const { id } = req.params;
    const { content, rating } = req.body;

    try {
        const updatedComment = await commentModel.findByIdAndUpdate(id, { content, rating, updatedAt: Date.now() }, { new: true });

        if (!updatedComment) {
            return next(new AppError("Comment not found", 404));
        }

        res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
    } catch (error) {
        return next(new AppError("Error updating comment", 500));
    }
};

// حذف تعليق
export const deleteComment = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedComment = await commentModel.findByIdAndDelete(id);

        if (!deletedComment) {
            return next(new AppError("Comment not found", 404));
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        return next(new AppError("Error deleting comment", 500));
    }
};

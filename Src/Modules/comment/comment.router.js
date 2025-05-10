import { Router } from "express";
import * as commentController from './comment.controller.js';
import { auth } from '../../Middleware/auth.js';
import { asyncHandler } from "../../Utils/catchError.js";

const router = Router();
router.post('/', auth(), asyncHandler(commentController.addComment));
router.get('/:movieId', asyncHandler(commentController.getCommentsByMovie));
router.put('/:id', auth(), asyncHandler(commentController.updateComment));
router.delete('/:id', auth(), asyncHandler(commentController.deleteComment));

export default router;

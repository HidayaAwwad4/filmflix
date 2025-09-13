import { Router } from "express";
import * as commentController from './comment.controller.js';
import { auth, roles } from '../../Middleware/auth.js';
import { asyncHandler } from "../../Utils/catchError.js";

const router = Router();
router.post('/', auth([roles.User]), asyncHandler(commentController.addComment));
router.get('/:movieId', asyncHandler(commentController.getCommentsByMovie));
router.put('/:id', auth([roles.User]), asyncHandler(commentController.updateComment));
router.delete('/:id', auth([roles.User, roles.Admin, roles.SuperAdmin]), asyncHandler(commentController.deleteComment));

export default router;

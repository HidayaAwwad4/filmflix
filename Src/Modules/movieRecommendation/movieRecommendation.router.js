import { Router } from "express";
import * as recommendationController from './movieRecommendation.controller.js'
import { auth } from '../../Middleware/auth.js';
import { asyncHandler } from '../../Utils/catchError.js';


const router = Router();

router.get('/user', auth(), asyncHandler(recommendationController.getRecommendations));

export default router;

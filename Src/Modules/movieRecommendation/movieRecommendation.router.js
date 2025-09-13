import { Router } from "express";
import * as recommendationController from './movieRecommendation.controller.js'
import { auth,roles } from '../../Middleware/auth.js';
import { asyncHandler } from '../../Utils/catchError.js';


const router = Router();

router.get('/user',  auth([roles.User]), asyncHandler(recommendationController.getRecommendations));

export default router;

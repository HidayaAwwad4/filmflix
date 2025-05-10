import { Router } from 'express';
import * as ratingController from './rating.controller.js';
import auth from '../../middleware/auth.js';

const router = Router();
router.post('/', auth(), ratingController.addOrUpdateRating);
router.get('/:movieId', ratingController.getMovieRatings);

export default router;

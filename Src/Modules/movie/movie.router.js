import { Router } from "express";
import * as movieController from './movie.controller.js';
import { auth, roles } from '../../Middleware/auth.js';
import validation from '../../Middleware/validation.js';
import { createMovieSchema, updateMovieSchema } from './movie.validation.js';
import { asyncHandler } from "../../Utils/catchError.js";
import  fileUpload from '../../Utils/multer.js'; 
const router = Router();

router.post('/', auth([roles.SuperAdmin, roles.Admin]),
    fileUpload().fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
    validation(createMovieSchema), asyncHandler(movieController.createMovie
));
router.put('/:id', auth([roles.SuperAdmin, roles.Admin]), validation(updateMovieSchema), asyncHandler(movieController.updateMovie));
router.delete('/:id', auth([roles.SuperAdmin]), asyncHandler(movieController.deleteMovie));
router.get('/:id', asyncHandler(movieController.getMovieById));
router.get('/', asyncHandler(movieController.getAllMovies));

export default router;

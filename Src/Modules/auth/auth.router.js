import { Router } from "express";
const router = Router();
import * as authController from './auth.controller.js';
import validation from '../../Middleware/validation.js';
import {registerSchema,loginSchema} from "./auth.validation.js";
import fileUpload from "../../Utils/multer.js";
import {asyncHandler} from "../../Utils/catchError.js";

router.post('/register',fileUpload,validation(registerSchema),asyncHandler(authController.register));
router.post('/login',validation(loginSchema),asyncHandler(authController.login));



export default router;
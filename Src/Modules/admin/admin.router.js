import { Router } from "express";
import * as adminController from './admin.controller.js';
import { auth, roles } from '../../Middleware/auth.js';
import validation from '../../Middleware/validation.js';
import { createAdminSchema, updateAdminSchema } from './admin.validation.js';
import {asyncHandler} from "../../Utils/catchError.js";
const router = Router();

router.post('/', auth([roles.SuperAdmin]), validation(createAdminSchema), asyncHandler(adminController.createAdmin));
router.put('/:id',auth([roles.SuperAdmin]), validation(updateAdminSchema), asyncHandler(adminController.updateAdmin));
router.delete('/:id', auth([roles.SuperAdmin]), asyncHandler(adminController.deleteAdmin));
router.get('/:id', auth([roles.SuperAdmin, roles.Admin]),asyncHandler(adminController.getAdmin));
router.get('/', auth([roles.SuperAdmin, roles.Admin]),asyncHandler(adminController.getAllAdmins));
export default router;

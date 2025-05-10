import { Router } from 'express';
import * as notificationController from './notification.controller.js';
import { auth, roles } from '../../Middleware/auth.js';
import validation from '../../Middleware/validation.js';
import { createNotificationSchema, updateNotificationSchema } from './notification.validation.js';
import { asyncHandler } from '../../Utils/catchError.js';

const router = Router();
router.post('/', auth([roles.Admin, roles.SuperAdmin]), validation(createNotificationSchema), asyncHandler(notificationController.createNotification));
router.get('/', auth([roles.Admin, roles.SuperAdmin]), asyncHandler(notificationController.getAllNotifications));
router.put('/:id', auth([roles.Admin, roles.SuperAdmin]), validation(updateNotificationSchema), asyncHandler(notificationController.updateNotification));
router.delete('/:id', auth([roles.Admin, roles.SuperAdmin]), asyncHandler(notificationController.deleteNotification));

export default router;

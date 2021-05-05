import { Router } from 'express';
import { validatorHandler } from '@rcebrian/tfg-rcebrian-common';
import { findById, update, remove } from '../controllers/users.controller';
import { editUserInfoValidator } from '../validations';

const router = Router();

router.route('/:userId([0-9]+)').get(findById);
router.route('/:userId([0-9]+)').put(editUserInfoValidator(), validatorHandler, update);
router.route('/:userId([0-9]+)').delete(remove);

export { router as usersRoutes };

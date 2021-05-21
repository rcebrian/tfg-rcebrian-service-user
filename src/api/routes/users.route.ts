import { Router } from 'express';
import { auth, roleAdmin, validatorHandler } from '@rcebrian/tfg-rcebrian-common';
import {
  findAllUsers, findById, update, remove,
} from '../controllers/users.controller';
import { editUserInfoValidator } from '../validations';

const router = Router();

router.route('/').get(auth, roleAdmin, findAllUsers);
router.route('/:userId([0-9]+)').get(findById);
router.route('/:userId([0-9]+)').put(editUserInfoValidator(), validatorHandler, update);
router.route('/:userId([0-9]+)').delete(remove);

export { router as usersRoutes };

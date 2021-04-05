import { Router } from 'express';
import {
  findAll, create, findById, update, remove,
} from '../controllers/users.controller';
import { registerFormValidator, editUserInfoValidator, validator } from '../middlewares/validation.middleware';

const router = Router();

router.route('/').get(findAll);
router.route('/').post(registerFormValidator(), validator, create);

router.route('/:userId([0-9]+)').get(findById);
router.route('/:userId([0-9]+)').put(editUserInfoValidator(), validator, update);
router.route('/:userId([0-9]+)').delete(remove);

export { router as usersRoutes };

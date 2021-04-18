import { Router } from 'express';
import {
  create, findById, update, remove,
} from '../controllers/users.controller';
import { validator } from '../middlewares';
import { registerFormValidator, editUserInfoValidator } from '../validations';

const router = Router();

router.route('/').post(registerFormValidator(), validator, create);

router.route('/:userId([0-9]+)').get(findById);
router.route('/:userId([0-9]+)').put(editUserInfoValidator(), validator, update);
router.route('/:userId([0-9]+)').delete(remove);

export { router as usersRoutes };

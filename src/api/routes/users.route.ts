import { Router } from 'express';
import {
  findAll, create, findById, update, remove,
} from '../controllers/users.controller';

const router = Router();

router.route('/').get(findAll);
router.route('/').post(create);

router.route('/:userId([0-9]+)').get(findById);
router.route('/:userId([0-9]+)').put(update);
router.route('/:userId([0-9]+)').delete(remove);

export { router as usersRoutes };

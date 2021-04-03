import { Router } from 'express';
import { findAll } from '../controllers/users.controller';

const router = Router();

router.route('/').get(findAll);

export { router as usersRoutes };

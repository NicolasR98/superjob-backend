import { Router } from 'express';
import user from './users.routes';
import auth from './auth.routes';

const router = Router();

router.get('/healthcheck', (_req, res) => res.sendStatus(200));

router.use(user);
router.use(auth);

export default router;

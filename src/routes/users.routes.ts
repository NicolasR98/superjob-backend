import { Router } from 'express'

const router = Router()

router.post('/api/users', (_req, res) => res.status(200))

export default router

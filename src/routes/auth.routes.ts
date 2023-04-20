import { Router } from "express";
import { Authenticate } from '../controllers/auth.controllers'

const router = Router()

router.post('/', Authenticate)

export default router;

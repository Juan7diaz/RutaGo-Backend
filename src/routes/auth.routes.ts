import { Router } from "express";
import { Authenticate } from '../controllers/auth.controllers'

const router = Router()

router.get('/', Authenticate)

export default router;

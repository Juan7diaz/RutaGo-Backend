import { Router } from "express";
import { getRoles } from '../controllers/role.controllers'
import { validateJWT } from "../middlewares/validateJWT";

const router = Router()

router.get('/', [validateJWT], getRoles)

export default router;

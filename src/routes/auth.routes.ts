import { Router } from "express";
import { Authenticate } from '../controllers/auth.controllers'
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

const router = Router()

router.post('/', [
  check('email', 'El email es obligatorio').notEmpty(),
  check('email', 'El email no se encuentra en el formato correcto').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validateFields
], Authenticate)

export default router;

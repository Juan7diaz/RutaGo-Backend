import { Router } from "express";
import { Authenticate, googleSignIn, sendNewPassword } from '../controllers/auth.controllers'
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

const router = Router()

router.post('/login', [
  check('email', 'El email es obligatorio').notEmpty(),
  check('email', 'El email no se encuentra en el formato correcto').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validateFields
], Authenticate)

router.post('/google', [
  check('id_token', 'El id_token es obligatorio').notEmpty(),
  validateFields
], googleSignIn)

router.post('/sendNewPassword', [
  check('email', 'El correo es obligatorio').notEmpty(),
  check('email', 'El email no se encuentra en el formato correcto').isEmail(),
  validateFields
], sendNewPassword)

export default router;

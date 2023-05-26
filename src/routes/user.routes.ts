import { Router } from "express";
import { check, header, param } from 'express-validator'

import {  getUsers, getUser, postUser, putUser, deleteUser } from '../controllers/user.controllers'
import { existingEmail, existingRole } from '../helpers/dbValidators'
import { validateFields } from "../middlewares/validateFields";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router()

router.get('/',[
  validateJWT,
  header('rutago-token', 'El token es requerido').notEmpty(),
], getUsers)

router.get('/:id',[
  validateJWT,
  param('id', 'El id es requerido').notEmpty(),
  header('rutago-token', 'El token es requerido').notEmpty(),
], getUser)

router.post('/', [
  check('firstName', 'El nombre es obligatorio').notEmpty(),
  check('lastName', 'El apellido es obligatorio').notEmpty(),
  check('email', 'El email es obligatorio').notEmpty(),
  check('email', 'El email no se encuentra en el formato correcto').isEmail(),
  check('email').custom( (email, {req}) => existingEmail(email, req) ),
  check('role', 'Se ha pasado un rolID vacio').optional().isNumeric().notEmpty(),
  check("role", 'El rolID no existe').custom( (id) => existingRole(id) ),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  validateFields
], postUser)

router.put('/:id',[
  validateJWT,
  header('rutago-token', 'El token es requerido').notEmpty(),
  param('id', 'El id es requerido').notEmpty(),
  check('firstName', 'Se ha pasado un nombre vacio').optional().notEmpty(),
  check('lastName', 'Se ha pasado un apellido vacio').optional().notEmpty(),
  check('email', 'El email no se encuentra en el formato correcto').optional().isEmail(),
  check('email').custom( (email, {req}) => existingEmail(email, req) ),
  check('role', 'Se ha pasado un rolID vacio').optional().isNumeric().notEmpty(),
  check("role", 'El rolID no existe').custom( (id) => existingRole(id) ),
  check('password', 'La contraseña debe tener al menos 6 caracteres').optional().isLength({ min: 6 }),
  validateFields
], putUser)

router.delete('/:id',[
  validateJWT,
  param('id', 'El id es requerido').notEmpty(),
  header('rutago-token', 'El token es requerido').notEmpty(),
  validateFields
], deleteUser)


export default router;

import { Router } from "express";
import {  body, header, param } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { validateJWT } from "../middlewares/validateJWT";
import { getBusroutes, getBusroute, postBusRoute, putBusroute, deleteBusroute } from "../controllers/busroute.controllers";

const router = Router()

router.get('/', [validateJWT], getBusroutes )

router.get('/:id', [
  validateJWT,
  param('id', 'El id es obligatorio').notEmpty(),
  param('id', 'El id debe ser un numero').isNumeric(),
  validateFields
], getBusroute )

router.post('/', [
  validateJWT,
  header('rutago-token', 'El token es requerido').notEmpty(),
  body("name", "El nombre es obligatorio").notEmpty(),
  body("route", "La ruta es obligatoria").notEmpty(),
  body("isActive", "El estado es obligatorio").optional().notEmpty().isBoolean(),
  validateFields
], postBusRoute )


router.put('/:idbus', [
  validateJWT,
  header('rutago-token', 'El token es requerido').notEmpty(),
  param('idbus', 'El id es obligatorio').notEmpty(),
  param('idbus', 'El id debe ser un numero').isNumeric(),
  body("name", "El nombre es obligatorio").notEmpty(),
  body("route", "La ruta es obligatoria").notEmpty().isArray(),
  body("isActive", "El estado es obligatorio y debe ser (true o false)").optional().notEmpty().isBoolean(),
  validateFields
], putBusroute )

router.delete('/:id', [
  validateJWT,
  header('rutago-token', 'El token es requerido').notEmpty(),
  param('id', 'El id es obligatorio').notEmpty(),
  param('id', 'El id debe ser un numero').isNumeric(),
  validateFields
], deleteBusroute )



export default router;

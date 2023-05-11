import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { validateJWT } from "../middlewares/validateJWT";
import { getBusroutes, getBusroute, llenar } from "../controllers/busroute.controllers";

const router = Router()

router.get('/', [validateJWT], getBusroutes )

// router.get('/:id', [
//   validateJWT,
//   param('id', 'El id es obligatorio').notEmpty(),
//   param('id', 'El id debe ser un numero').isNumeric(),
//   validateFields
// ], getBusroute )

router.get('/llenar', [
  validateJWT,
  check('llenar', 'debe marcarse como treus').notEmpty(),
  validateFields
], llenar )

export default router;

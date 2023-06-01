import { Router } from "express";
import { body } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { validateJWT } from "../middlewares/validateJWT";
import { getFavorite, addFavorite, removeFavorite } from "../controllers/favroute.controller";

const router = Router()

router.get('/', [
    validateJWT,
    body('email', 'Se debe pasar un email').notEmpty(),
    validateFields
], getFavorite)

router.post('/', [
    validateJWT,
    body('idu', 'Se debe pasar un ID de usuario valido').notEmpty(),
    body('idr', 'Se debe pasar un iD de ruta valido').notEmpty(),
    validateFields
], addFavorite)

router.delete('/', [
    validateJWT,
    body('idu', 'Se debe pasar un ID de usuario valido').notEmpty(),
    body('idr', 'Se debe pasar un iD de ruta valido').notEmpty(),
    validateFields
], removeFavorite)



export default router;
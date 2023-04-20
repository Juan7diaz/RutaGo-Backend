import { Router } from "express";
import { getUsers, getUser } from '../controllers/users.controllers'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)

export default router;

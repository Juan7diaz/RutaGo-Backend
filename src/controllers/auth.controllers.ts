import { Request, Response } from "express";
import AppDataSource from '../database/config'
import bcrypt from 'bcryptjs'
import User from '../entities/User.entities'

export const Authenticate = async (req: Request, res: Response) => {

  const { email, password } = req.body

  try {

    AppDataSource.getRepository(User)

    const error = {
      ok: false,
      message: 'El correo o la contraseña estan incorrectas'
    }

    // buscamos el usuario con el mismo correo
    const user = await AppDataSource
    .getRepository(User)
    .find({
      where: { state: true, email: email }
    })

    if(user.length === 0) return res.status(200).json(error)

    if(!bcrypt.compareSync(password, user[0].password)) return res.status(200).json(error)

    res.status(200).json({
      ok: true,
      message: 'Usuario autenticado correctamente',
      user: user[0]
    })

  } catch (error) {

    res.status(400).json({
      ok: false,
      message: "Error al intentar obtener el usuario",
      error: error
    })

  }
}

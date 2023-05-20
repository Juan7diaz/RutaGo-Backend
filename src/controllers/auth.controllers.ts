import { Request, Response } from "express";
import AppDataSource from '../database/config'
import bcrypt from 'bcryptjs'
import User from '../entities/User.entities'
import { generateJWT } from "../helpers/generateJWT";

export const Authenticate = async (req: Request, res: Response) => {

  const { email, password } = req.body

  try {

    AppDataSource.getRepository(User)

    const error = {
      ok: false,
      message: 'El correo o la contraseña estan incorrectas'
    }

    // verificamos el email y si es un usuario activo
    const user = await AppDataSource
    .getRepository(User)
    .findOne({
      relations: {role: true },
      where: { state: true, email: email }
    })

    // retornamos en caso de que no exista
    if(!user) return res.status(400).json(error)

    // verificamos la contraseña
    if(!bcrypt.compareSync(password, user.password)) return res.status(400).json(error)

    // enviamos solo los datos que queremos mostrar
    const dataUser = {
      id: user.id, // temporal
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role.role,
    }

    // generamos JWT
    const token = await generateJWT(  user.id, user.role.role,   );

    res.status(200).json({
      ok: true,
      message: 'Usuario autenticado correctamente',
      user: dataUser,
      token: token
    })

  } catch (error) {

    res.status(500).json({
      ok: false,
      message: "Error al intentar obtener el usuario",
      error: error
    })

  }
}

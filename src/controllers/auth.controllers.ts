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
    .find({
      where: { state: true, email: email }
    })

    // retornamos en caso de que no exista
    if(user.length === 0) return res.status(400).json(error)

    // verificamos la contraseña
    if(!bcrypt.compareSync(password, user[0].password)) return res.status(400).json(error)

    // enviamos solo los datos que queremos mostrar
    const dataUser = {
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      email: user[0].email
    }

    // generamos JWT
    const token = await generateJWT(  user[0].id  );

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

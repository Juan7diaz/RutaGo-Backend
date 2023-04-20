import { Request, Response } from "express";
import AppDataSource from '../database/config'
import bcrypt from 'bcryptjs'
import User from '../entities/User.entities'

export const Authenticate = async (req: Request, res: Response) => {

  const data = req.body

  if(!data.email || !data.password){
    return res.status(400).json({
      error: 'Email or password is missing'
    })
  }

  if(data.password){
    // descomentar esta linea cuando se quiera encriptar la contraseña
    //data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
  }

  try {

    AppDataSource.getRepository(User)

    const user = await AppDataSource
    .getRepository(User)
    .find({
      where: { state: true, email: data.email, password: data.password }
    })

    res.status(200).json(
      user.length > 0
        ? {...user[0], ok: true}
        : { message: `El correo o la contraseña estan incorrectas`, ok: false }
    )

  } catch (err) {

    res.status(400).json({
      error: err
    })

  }
}

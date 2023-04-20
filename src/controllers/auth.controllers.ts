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

  console.log(data)

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

    res.json(
      user.length > 0 ? user[0] : { message: `the user with email ${data.email} does not exist` }
    )

  } catch (err) {

    res.status(400).json({
      error: err
    })

  }
}



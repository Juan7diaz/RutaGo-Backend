import { Request, Response } from "express";
import AppDataSource from '../database/config'
import bcrypt from 'bcryptjs'

import User from '../entities/User.entities'

export const getUsers = async (req: Request, res: Response) => {

  AppDataSource.getRepository(User)

  // hacemos la logica de la paginación
  const page: number = req.query.page ? Number(req.query.page) : 1
  const limit: number = req.query.limit ? Number(req.query.limit) : 20
  const offset: number = (page - 1) * limit

  try {
    // https://typeorm.io/many-to-one-one-to-many-relations
    // https://orkhan.gitbook.io/typeorm/docs/find-options
    const [allUsers, amountUsers] = await Promise.all([
      AppDataSource.getRepository(User).find({ where: { state: true }, take: limit, skip: offset, }),
      AppDataSource.getRepository(User).countBy({ state: true }),
    ])

    const info = {
      current_page: page,
      Total_page: Math.ceil(amountUsers / limit),
      total_users: amountUsers,
      limit: limit,
      offset: offset,
    }

    res.json({
      ok: true,
      info: info,
      users: allUsers,
    })

  } catch (err) {

    res.status(400).json({
      ok: false,
      message: "Error al obtener los usuarios",
      error: err
    })

  }
}

export const getUser = async (req: Request, res: Response) => {

  const userId = parseInt(req.params.id)

  try {

    const user = await AppDataSource
      .getRepository(User)
      .find({
        where: { state: true, id: userId }
      })

    const success = {
      ok: true,
      message: "El usuario se ha encontrado correctamente",
      user: user[0]
    }

    const error = {
      ok: false,
      message: `El usuario con el id: ${userId} no existe`,
    }

    res.json( user.length > 0 ?  success : error)

  } catch (err) {

    res.status(400).json({
      error: err
    })

  }
}


export const postUser = (req: Request, res: Response) => {

  try{

    const { firstName, lastName, email, password } = req.body

    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    AppDataSource.manager.save(user)

    res.json({
      ok: true,
      message: "El usuario se ha creado correctamente",
      user: user
    })

  }catch(err){
    res.status(400).json({
      ok: false,
      message: "Error al crear el usuario",
      err: err
    })
  }

}


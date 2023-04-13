import { Request, Response } from "express";
import AppDataSource from '../database/config'

import User from '../entities/User.entities'

export const getUsers = async (req: Request, res: Response) => {

  AppDataSource.getRepository( User )

  // hacemos la logica de la paginación
  const page: number = req.query.page ? Number( req.query.page ) : 1
  const limit: number = req.query.limit ? Number( req.query.limit ) : 20
  const offset: number = (page - 1) * limit

  try {
    // https://typeorm.io/many-to-one-one-to-many-relations
    // https://orkhan.gitbook.io/typeorm/docs/find-options
    const [allUsers, amountUsers] = await Promise.all([
      AppDataSource.getRepository( User ).find( { where: { state: true }, take: limit, skip: offset, } ),
      AppDataSource.getRepository( User ).countBy( { state: true } ),
    ])

    const info = {
      current_page: page,
      Total_page: Math.ceil( amountUsers / limit ),
      total_users: amountUsers,
      limit: limit,
      offset: offset,
    }

    res.json({
      info: info,
      users: allUsers,
    })

  } catch ( err ) {

    res.status(400).json({
      error: err
    })

  }
}
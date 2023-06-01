import { Request, Response } from "express";
import AppDataSource from '../database/config'
import Role from '../entities/Role.entities'

export const getRoles = async (req: Request, res: Response) => {

  try {
    const roles =  await AppDataSource.getRepository(Role).find()

    res.json({
      ok: true,
      message: "Roles obtenidos correctamente",
      roles:  roles
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "Error al obtener los roles",
      error: error
    })
  }
}
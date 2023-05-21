import { Request, Response } from "express";
import AppDataSource from '../database/config'
import Busroute from '../entities/Busroute.entities'

export const getBusroutes = async (req: Request, res: Response) => {

  const rutas =  await AppDataSource.getRepository(Busroute).find()

  res.json({
    ok: true,
    message: "Rutas obtenidas correctamente",
    routes:  rutas
  })

}

export const getBusroute = async (req: Request, res: Response) => {

  const idroute = parseInt(req.params.id)

  const rutas =  await AppDataSource.getRepository(Busroute).findOne({ where: { id: idroute, isActive: true} })

  res.json({
    ok: true,
    message: "La rutas fué obtenidas correctamente",
    route:  rutas
  })

}

export const postBusRoute = async (req: Request, res: Response) => {

  try{

    const { name, isActive, route } = req.body
    console.log('hola')

    const newbusroute = new Busroute()
    newbusroute.name = name
    newbusroute.isActive = isActive == 'true' ? true : false
    newbusroute.route = route
    AppDataSource.manager.save(newbusroute)

    res.json({
      ok: true,
      message: "Se ha creado una ruta correctamente",
      route: newbusroute
    })

  }catch(error){
    res.status(400).json({
      ok: false,
      message: "Error al crear la ruta de bus",
      error: error
    })
  }


}

export const putBusroute = async (req: Request, res: Response) => {

  try{

    const { id, ...rest } = req.body

    const UsersRepository = AppDataSource.getRepository(Busroute)
    await UsersRepository.update(id, rest)

    res.json({
      ok: true,
      message: "La ruta se ha actualizado correctamente",
    })

  }catch(error){
    res.status(400).json({
      ok: false,
      message: "Error al actualizar la ruta de bus",
      error: error
    })
  }

}

export const deleteBusroute = async (req: Request, res: Response) => {

  try{

    const { id } = req.params

    const UsersRepository = AppDataSource.getRepository(Busroute)
    await UsersRepository.delete(id)

    res.json({
      ok: true,
      message: "La ruta se ha eliminado correctamente",
    })

  }catch(error){
    res.status(400).json({
      ok: false,
      message: "Error al eliminar la ruta de bus",
      error: error
    })
  }

}

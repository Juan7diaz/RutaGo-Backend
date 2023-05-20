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

export const llenar = async (req: Request, res: Response) => {

  const recorrido = [
    [11.220679, -74.181324],
    [11.219621, -74.186805],
    [11.219731, -74.187021],
    [11.219782, -74.187184],
    [11.219701, -74.187329],
    [11.219548, -74.187382],
    [11.219357, -74.187536],
    [11.219357, -74.187536],
    [11.21929, -74.187859],
    [11.219969, -74.188081],
    [11.220935, -74.188263],
    [11.223739, -74.189188],
    [11.225736, -74.189646],
    [11.225748, -74.189647],
    [11.226041, -74.189246],
    [11.226133, -74.188953],
    [11.226203, -74.18856],
    [11.226306, -74.188585],
    [11.226173, -74.189044],
    [11.226035, -74.189408],
    [11.225627, -74.189915],
    [11.224706, -74.191089],
    [11.22411, -74.191908],
    [11.223532, -74.192644],
    [11.222909, -74.193432],
    [11.22011, -74.191305],
    [11.219021, -74.190677],
    [11.218367, -74.190549],
    [11.218203, -74.190088],
    [11.218511, -74.189469],
    [11.218819, -74.188164],
    [11.218727, -74.187845],
    [11.218647, -74.18767],
    [11.218704, -74.187499],
    [11.218888, -74.187329],
    [11.219045, -74.187064],
    [11.219262, -74.186016],
    [11.219407, -74.185558],
    [11.220068, -74.182453],
    [11.221544, -74.176636],
    [11.221652, -74.175915],
    [11.221436, -74.175633],
    [11.221427, -74.175504],
    [11.221497, -74.175212],
    [11.221834, -74.175036],
    [11.222228, -74.175203],
    [11.222209, -74.175709],
    [11.221947, -74.175953],
    [11.22175, -74.176593],
    [11.221605, -74.177156],
    [11.221656, -74.177433],
    [11.220679, -74.181324],
  ];
  const newRuta = new Busroute()
  newRuta.name = "terminar universidad"
  newRuta.isActive = true
  newRuta.route = recorrido
  AppDataSource.manager.save(newRuta)

  res.json({
    ok: true,
    message: "Rutas obtenidas correctamente",
    rutas:  newRuta
  })

 }

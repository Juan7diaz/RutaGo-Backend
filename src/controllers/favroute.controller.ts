import { Request, Response } from "express";
import AppDataSource from '../database/config'
import Busroute from '../entities/Busroute.entities'
import User from "../entities/User.entities";

export const getFavorite = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const rutasFav = await AppDataSource.getRepository(User).find({
        relations: {rutafav:true},
        where: {email: email}
    })

    res.json({
        ok: true,
        message: "Rutas obtenidas correctamente",
        routes: rutasFav
    })

}

export const addFavorite = async (req: Request, res: Response) => {

    const { idu, idr } = req.body

    const Rut = await AppDataSource.getRepository(Busroute).find({
        where: {id: idr}
    })

    const Usr = await AppDataSource.getRepository(User).findOne({
        relations: {rutafav:true},
        where: {id: idu}
    })
    
    if (Usr) {
        Usr.rutafav = Rut;
        await AppDataSource.getRepository(User).save(Usr);
    }

    res.json({
        ok: true,
        message: "Ruta agregada correctamente"
    })

}

export const removeFavorite = async (req: Request, res: Response) => {

    const { idu, idr } = req.body

    const Rut = await AppDataSource.getRepository(Busroute).findOne({
        where: {id: idr}
    })

    const  Usr= await AppDataSource.getRepository(User).findOne({
        relations: {
            rutafav: true,
        },
        where: { id: idu }
    })
    if(Usr){
        Usr.rutafav = Usr.rutafav.filter((Favorito) => {
            return Favorito.id !== Rut?.id
        })
        await AppDataSource.getRepository(User).save(Usr)
    }

    res.json({
        ok: true,
        message: "Ruta borrada correctamente"
    })

}

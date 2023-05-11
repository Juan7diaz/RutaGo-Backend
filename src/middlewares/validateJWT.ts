import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import User from '../entities/User.entities';
import AppDataSource from '../database/config';
import { CustomRequest, IpayloadToken } from '../../interfaces';

export const validateJWT = async( req:CustomRequest, res:Response, next:NextFunction ) => {

  const token = req.header('rutago-token');

  // verificamos que exista el token en los headers
  if( !token ){
    return res.status(401).json({
      ok: false,
      message: 'No se ha proporcionado un token [rutago-token]'
    })
  }

  try {

    const secretOrPrivateKey = process.env.TOKEN_SECRET!.toString();
    const { uid }  = jwt.verify(token, secretOrPrivateKey) as IpayloadToken

    const user = await AppDataSource.getRepository(User).findOneBy({ id: uid, state: true })

    if( !user ){
      return res.status(401).json({
        ok: false,
        message: 'Token no valido'
      })
    }

    req.userAuth = user

    next()

  } catch (error) {
    res.status(401).json({
      ok: false,
      message: "Token no valido",
      error: error
    })
  }

}
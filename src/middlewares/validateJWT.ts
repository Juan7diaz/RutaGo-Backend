import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import User from '../entities/User.entities';
import AppDataSource from '../database/config';

interface Ipayload {
  uid: number,
  iat: number,
  exp: number
}

interface IuserAuth {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  state: boolean,
}

interface CustomRequest extends Request {
  userAuth?: IuserAuth;
}

export const validateJWT = async( req:CustomRequest, res:Response, next:NextFunction ) => {

  const token = req.header('rutago-token');

  // verificamos que exista el token en los headers
  if( !token ){
    return res.status(401).json({
      ok: false,
      message: 'No se ha proporcionado un token'
    })
  }

  try {

    const secretOrPrivateKey = process.env.TOKEN_SECRET!.toString();
    const { uid } = jwt.verify(token, secretOrPrivateKey) as Ipayload

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
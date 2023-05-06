import { Request } from 'express';

export interface IpayloadToken {
  uid: number,
  iat: number,
  exp: number
}

export interface IuserAuth {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  state: boolean,
}

export interface CustomRequest extends Request {
  userAuth?: IuserAuth;
}

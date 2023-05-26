import { Request } from 'express';
import User from '../entities/User.entities'
import Role from '../entities/Role.entities'
import AppDataSource from '../database/config'

export const existingEmail = async(email = '', req:Request|any) => {

  const id = parseInt(req.params.id) || -1

  const UserRepository = AppDataSource.getRepository(User)

  let existingEmail

  if(id > 0){
    existingEmail = await UserRepository.findOneBy({
      email: email,
      id: id
    })
    existingEmail = existingEmail?.id == id ? null : existingEmail
  }else{
    existingEmail = await UserRepository.findOneBy({ email: email})
  }

  if(existingEmail){
    throw new Error(`El ${email} ya se encuentra en uso`)
  }

}

export const existingUserById = async( id : number ) => {

  const UserRepository = AppDataSource.getRepository(User)

  const userExists = await UserRepository.findOneBy({
    id: id,
    state: true,
  })

  if(!userExists){
    throw new Error(`EL usuario con id ${id} no existe`)
  }

}



export const existingRole = async( idRole: number ) => {

  const RoleRepository = AppDataSource.getRepository(Role)

  const rolExists = await RoleRepository.findOneBy({ id: idRole })

  if(!rolExists){
    throw new Error(`el rolID ingresado no está registrado en la base de datos`)
  }

}
import express from "express";
import cors from "cors";

import userRoutes from '../routes/users.routes'
import authRoutes from '../routes/auth.routes'
import AppDataSource from '../database/config'

class Server {
  port: string | undefined
  app: any

  constructor() {
    this.port = process.env.port;
    this.app = express()
    this.databaseInitialize()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.static("public"))
    this.app.use(express.json())
    this.app.use(cors())
  }

  async databaseInitialize(){
    try{
      await AppDataSource.initialize()
    }catch(err){
      console.error("ERROR AL MOMENTO DE INIZIALIZAR LA BASE DE DATO: ")
      console.error(err)
    }
  }

  routes(){
    this.app.use('/api/users', userRoutes)
    this.app.use('/api/auth', authRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

export default Server;

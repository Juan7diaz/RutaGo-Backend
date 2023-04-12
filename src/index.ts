import Server from './server/server'
import "reflect-metadata"
import 'dotenv/config'

const server = new Server()
server.listen()

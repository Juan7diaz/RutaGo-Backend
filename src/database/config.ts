import { DataSource } from "typeorm"
import { User } from '../entities/User.entities'

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "password",
  port: 5432,
  database: "RutaGo",
  entities: [ User ],
  //logging: true,
  synchronize: true,
});

export default AppDataSource
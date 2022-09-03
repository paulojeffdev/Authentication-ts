import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "paul_jeff",
    password: "123@abc",
    database: "authenticationts",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
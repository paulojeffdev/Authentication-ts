import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "us-cdbr-east-06.cleardb.net/heroku_b5a591b6f2cdf4d",
    port: 3306,
    username: "b34c3f4c816441",
    password: "7d669314",
    database: "authenticationts",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
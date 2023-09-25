import { DataSource, DataSourceOptions } from "typeorm";
import { Entities } from "../entity";

const databaseConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env['DATABASE_HOST'] ||  "localhost",
  port: Number(process.env['DATABASE_PORT']) || 5432,
  username: process.env['DATABASE_USERNAME'] || "postgres",
  password: process.env['DATABASE_PASSWORD'] ||  "postgres",
  database: process.env['DATABASE_NAME'] || "athlyedge",
  entities: Entities,
  logging: process.env['APP_ENV'] === 'dev' || process.env['APP_ENV'] === 'development',
  synchronize: true, // Auto sync database
}

export const appDataSource = new DataSource(databaseConfig)

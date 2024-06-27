import { TypeOrmModuleOptions } from "@nestjs/typeorm";

console.log("Database Configuration:", {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const config: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as "mysql" | "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "test",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,
};

export default config;

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(

    // Credenciais de acesso:
    process.env.DATABASE_MYSQL_SCHEMA,
    process.env.DATABASE_MYSQL_USERNAME,
    process.env.DATABASE_MYSQL_PASSWORD,

    {

        // Configurações adicionais:
        // Personalização global:
        port: Number(process.env.DATABASE_MYSQL_PORT_NUMBER),
        host: process.env.DATABASE_MYSQL_HOSTNAME,
        timezone: "-03:00",
        dialect: "mysql",

    },

);

export default sequelize;
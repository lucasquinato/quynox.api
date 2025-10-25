import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize.js";
import bcrypt from "bcrypt";

class Account extends Model {}

Account.init(

    {

        // Identificador privado:
        // Identificador organizacional:
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        // Credenciais de acesso:
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Identificador público:
        public_id: {
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
    },

    {
        // Conexão:
        sequelize,

        // Configurações:
        modelName: "Account",
        tableName: "accounts",
        underscored: true,
        timestamps: true,
        paranoid: true,
    },

);

export default Account;
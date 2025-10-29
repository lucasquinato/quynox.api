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
            validate: {
                notEmpty: {
                    msg: "DATABASE LEVEL ERROR ! EMPTY VALUE FIELD: name.",
                },
                len: {
                    args: [3, 80],
                    msg: "DATABASE LEVEL ERROR ! LENGHT FIELD: name.",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "DATABASE LEVEL ERROR ! EMPTY VALUE FIELD: email.",
                },
                isEmail: {
                    msg: "DATABASE LEVEL ERROR ! IS EMAIL FIELD: email.",
                },
            }
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

        hooks: {

            async beforeSave(account) {
                if (account.changed("password")) {
                    const getRounds = Number(process.env.DATABASE_PASSWORD_ROUNDS);

                    if (Number.isNaN(getRounds)) {
                        throw new TypeError("Verifique o tipo de: DATABASE_PASSWORD_ROUNDS.");
                    }

                    if (getRounds < 4 || getRounds > 15) {
                        throw new RangeError("Verifique o escopo de: DATABASE_PASSWORD_ROUNDS.");
                    }

                    const salt = await bcrypt.genSalt(getRounds);
                    account.password = await bcrypt.hash(account.password, salt);
                }
            },

        },
    },

);

export default Account;
import sequelize from "./sequelize.js";

/**
 * @param {{ force: string }} options Opções de sincronização das tabelas.
 */
async function DBConnection(options = {}) {
    try {
        // Realiza a autenticação e sincronização com o banco de dados:

        await sequelize.authenticate();
        await sequelize.sync({ force: options?.force });

    // Captura erros de conexão:
    } catch (error) {
        await sequelize.close();
        throw error;
    }
}

export default DBConnection;
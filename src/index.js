import DBConnection from "./database/db.connection.js";
import routes from "./modules/routes.js";
import express from "express";

const server = express();

const port = () => {
    const getPort = Number(process.env.PORT_ENV);

    // Verifica se a porta está dentro dos padrões:
    if (!getPort || isNaN(getPort)) throw new Error("Defina PORT_ENV corretamente.");
    if (getPort < 1024 || getPort > 65535) throw new RangeError("PORT_ENV fora de escopo.");

    // console.log(getPort);
    return getPort;
}

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

try {
    // Aguarda a conexão correta com o banco de dados:
    await DBConnection({ force: true });
    // Abre o servidor para requisições:
    server.listen(port(), () => console.log("Servidor aberto - porta:", port()));

// Erros em tempo de execução:
} catch (error) {
    console.error(error);
    process.exit(1);
}
import { ConnectionOptions } from "typeorm";

import { EnderecoAtual } from "../entities/db_rastramento_cartoes/EnderecoAtual";
import { HistoricoObjeto } from "../entities/db_rastramento_cartoes/HistoricoObjeto";
import { IdEnvioSalesforce } from "../entities/db_rastramento_cartoes/IdEnvioSalesforce";
import { Objeto } from "../entities/db_rastramento_cartoes/Objeto";
import { ObjetoPendente } from "../entities/db_rastramento_cartoes/ObjetoPendente";
import { Produto } from "../entities/stage/Produto";
import { azureKeyVaults } from "./AzureKeyVaults";

async function getDbRastreamentoConfig(): Promise<ConnectionOptions> {
    const entities_db_rastreamento = [
        Objeto,
        HistoricoObjeto,
        EnderecoAtual,
        ObjetoPendente,
        IdEnvioSalesforce,
    ];
    const [dbHost, dbUser, dbPassword, dbDatabase] = await Promise.all([
        azureKeyVaults.getSecret(process.env.RASTREAMENTO_CARTOES_DB_HOST),
        azureKeyVaults.getSecret(process.env.RASTREAMENTO_CARTOES_DB_USER),
        azureKeyVaults.getSecret(process.env.RASTREAMENTO_CARTOES_DB_PASSWORD),
        azureKeyVaults.getSecret(process.env.RASTREAMENTO_CARTOES_DB_DATABASE),
    ]);

    return {
        name: "default",
        host: dbHost,
        username: dbUser,
        password: dbPassword,
        database: dbDatabase,
        type: "mssql",
        port: Number(process.env.DB_PORT) || 1433,
        entities: entities_db_rastreamento,
        logging: false,
        options: {
            encrypt: true,
            useUTC: true,
            trustServerCertificate: true,
        },
    } as ConnectionOptions;
}

async function getDbStageConfig(): Promise<ConnectionOptions> {
    const entities = [Produto];
    const [dbHost, dbUser, dbPassword, dbDatabase] = await Promise.all([
        azureKeyVaults.getSecret(process.env.STAGE_DB_HOST),
        azureKeyVaults.getSecret(process.env.STAGE_DB_USER),
        azureKeyVaults.getSecret(process.env.STAGE_DB_PASSWORD),
        azureKeyVaults.getSecret(process.env.STAGE_DB_DATABASE),
    ]);

    return {
        name: "stage",
        host: dbHost,
        username: dbUser,
        password: dbPassword,
        database: dbDatabase,
        type: "mssql",
        port: Number(process.env.DB_PORT) || 1433,
        entities,
        logging: false,
        options: {
            encrypt: true,
            useUTC: true,
        },
    };
}

export { getDbRastreamentoConfig, getDbStageConfig };

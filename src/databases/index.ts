import { createConnections } from "typeorm";

import { getDbRastreamentoConfig, getDbStageConfig } from "../config/Database";

async function connectToDB() {
    const dbRastreamentoCartoesConfig = await getDbRastreamentoConfig();
    const dbStageConfig = await getDbStageConfig();
    await createConnections([
        {
            ...dbRastreamentoCartoesConfig,
        },
        { ...dbStageConfig },
    ]);
}

export { connectToDB };

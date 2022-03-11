import { IdEnvioSalesforceRepositoryTypeORM } from "../repositories/implementations/IdEnvioSalesforceRepositoryTypeOrm";
import { GetUltimoIdEnviado } from "../services/GetUltimoIdEnviado";

export function getGetUltimoIdEnviado() {
    const repository = new IdEnvioSalesforceRepositoryTypeORM();

    return new GetUltimoIdEnviado(repository);
}

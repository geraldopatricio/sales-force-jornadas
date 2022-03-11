import { IdEnvioSalesforceRepositoryTypeORM } from "../repositories/implementations/IdEnvioSalesforceRepositoryTypeOrm";
import { SaveUltimoIdEnviado } from "../services/SaveUltimoIdEnviado";

export function getsaveUltimoIdEnviado() {
    const repository = new IdEnvioSalesforceRepositoryTypeORM();

    return new SaveUltimoIdEnviado(repository);
}

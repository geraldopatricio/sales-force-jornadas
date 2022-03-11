import { IdEnvioSalesforce } from "../entities/db_rastramento_cartoes/IdEnvioSalesforce";

export interface IIdEnvioSalesforceRepository {
    save(idEnvioSalesforce: IdEnvioSalesforce): Promise<void>;
    get(): Promise<IdEnvioSalesforce>;
}

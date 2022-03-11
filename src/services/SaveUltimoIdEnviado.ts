import { IdEnvioSalesforce } from "../entities/db_rastramento_cartoes/IdEnvioSalesforce";
import { IIdEnvioSalesforceRepository } from "../repositories/IIdEnvioSalesforceRepository";

export class SaveUltimoIdEnviado {
    constructor(
        private idEnvioSalesforceRepository: IIdEnvioSalesforceRepository
    ) {}

    async execute(idEnvioSalesforce: IdEnvioSalesforce): Promise<void> {
        await this.idEnvioSalesforceRepository.save(idEnvioSalesforce);
    }
}

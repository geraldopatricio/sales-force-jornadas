import { IdEnvioSalesforce } from "../entities/db_rastramento_cartoes/IdEnvioSalesforce";
import { IIdEnvioSalesforceRepository } from "../repositories/IIdEnvioSalesforceRepository";

export class GetUltimoIdEnviado {
    constructor(
        private idEnvioSalesforceRepository: IIdEnvioSalesforceRepository
    ) {}

    async execute(): Promise<IdEnvioSalesforce> {
        const idEnvioSalesforce = await this.idEnvioSalesforceRepository.get();
        return idEnvioSalesforce;
    }
}

import { getRepository, Repository } from "typeorm";

import { IdEnvioSalesforce } from "../../entities/db_rastramento_cartoes/IdEnvioSalesforce";
import { IIdEnvioSalesforceRepository } from "../IIdEnvioSalesforceRepository";

export class IdEnvioSalesforceRepositoryTypeORM
    implements IIdEnvioSalesforceRepository
{
    private idEnvioRepository: Repository<IdEnvioSalesforce>;

    constructor() {
        this.idEnvioRepository = getRepository(IdEnvioSalesforce);
    }

    async save(idEnvioSalesforce: IdEnvioSalesforce): Promise<void> {
        await this.idEnvioRepository.save(idEnvioSalesforce);
    }
    async get(): Promise<IdEnvioSalesforce> {
        const idEnvioSalesforce = await this.idEnvioRepository
            .createQueryBuilder("idEnvioSalesforce")
            .orderBy("id", "DESC")
            .limit(1)
            .getOne();
        return idEnvioSalesforce;
    }
}

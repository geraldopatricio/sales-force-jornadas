import { getRepository, Repository } from "typeorm";

import { AcessoKibana } from "../../entities/stage/AcessoKibana";
import { IAcessoKibanaRepository } from "../IAcessoKibanaRepository";

export class AcessoKibanaRepository implements IAcessoKibanaRepository {
    private acessoKibanaRepository: Repository<AcessoKibana>;
    constructor() {
        this.acessoKibanaRepository = getRepository(AcessoKibana);
    }

    async getByDsUsuario(numeroReceitaFederal: string): Promise<AcessoKibana> {
        const acesso = await this.acessoKibanaRepository.findOne({
            ds_usuario: numeroReceitaFederal,
        });
        return acesso;
    }
}

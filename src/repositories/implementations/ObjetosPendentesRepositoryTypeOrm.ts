import { getRepository, Repository } from "typeorm";

import { ObjetoPendente } from "../../entities/db_rastramento_cartoes/ObjetoPendente";
import { IObjetosPendentes } from "../IObjetosPendentesRepository";

export class ObjetosPendentesRepository implements IObjetosPendentes {
    private objetosRepository: Repository<ObjetoPendente>;
    constructor() {
        this.objetosRepository = getRepository(ObjetoPendente);
    }
    async getById(id: number): Promise<ObjetoPendente> {
        const objetoPendente = await this.objetosRepository.findOne(id);
        return objetoPendente;
    }
    async save(objetoPendente: ObjetoPendente): Promise<void> {
        await this.objetosRepository.save(objetoPendente);
    }
}

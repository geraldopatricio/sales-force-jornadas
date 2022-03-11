import { ObjetoPendente } from "../entities/db_rastramento_cartoes/ObjetoPendente";
import { IObjetosPendentes } from "../repositories/IObjetosPendentesRepository";

export class SaveObjetoPendenteService {
    constructor(private objetosPendentesRepository: IObjetosPendentes) {}
    async execute(objetoPendente: ObjetoPendente): Promise<void> {
        await this.objetosPendentesRepository.save(objetoPendente);
    }
}

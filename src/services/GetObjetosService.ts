import { Objeto } from "../entities/db_rastramento_cartoes/Objeto";
import { IObjetoRepository } from "../repositories/IObjetoRepository";

export class GetObjetosService {
    constructor(private objetoRepository: IObjetoRepository) {}

    async execute(): Promise<Objeto[]> {
        const objetoWithCount =
            await this.objetoRepository.getObjetosByDataAtualizacaoLessThanTenMinutesAgo();
        return objetoWithCount;
    }
}

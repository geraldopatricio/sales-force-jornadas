import { Objeto } from "../entities/db_rastramento_cartoes/Objeto";
import { IObjetoRepository } from "../repositories/IObjetoRepository";

export class GetObjetosPendentesService {
    constructor(private objetosRepository: IObjetoRepository) {}

    async execute(): Promise<[Objeto[], number]> {
        const [objetosPendentes, count] =
            await this.objetosRepository.getObjetosDataChecagemToday();

        return [objetosPendentes, count];
    }
}

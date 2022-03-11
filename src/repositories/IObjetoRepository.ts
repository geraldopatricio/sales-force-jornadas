import { Objeto } from "../entities/db_rastramento_cartoes/Objeto";

export interface IObjetoRepository {
    getObjetosByDataAtualizacaoLessThanTenMinutesAgo(): Promise<Objeto[]>;
    getObjetosDataChecagemToday(): Promise<[Objeto[], number]>;
}

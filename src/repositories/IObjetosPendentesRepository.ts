import { ObjetoPendente } from "../entities/db_rastramento_cartoes/ObjetoPendente";

export interface IObjetosPendentes {
    getById(id: number): Promise<ObjetoPendente>;
    save(objetoPendente: ObjetoPendente): Promise<void>;
}

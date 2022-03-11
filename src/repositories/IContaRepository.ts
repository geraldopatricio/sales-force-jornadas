import { IConta } from "../domain/pier/Conta";

export interface IContaRepository {
    getContaById(idConta: number): Promise<IConta>;
}

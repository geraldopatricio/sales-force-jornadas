import { ITelefone } from "../domain/pier/Telefone";

export interface ITelefoneRepository {
    getTelefonesByidPessoa(idPessoa: number): Promise<ITelefone[]>;
}

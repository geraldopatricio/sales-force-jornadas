import { IEndereco } from "../domain/pier/Endereco";

export interface IEnderecoRepository {
    findEnderecosByPerson(idPessoa: number): Promise<IEndereco[]>;
}

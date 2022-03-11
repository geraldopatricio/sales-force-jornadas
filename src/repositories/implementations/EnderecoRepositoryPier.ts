import { AxiosInstance } from "axios";

import { PierApi } from "../../apis/PierApi";
import { IEndereco } from "../../domain/pier/Endereco";
import { IEnderecoRepository } from "../IEnderecoRepository";

export class EnderecoRepositoryPier implements IEnderecoRepository {
    private api: AxiosInstance = PierApi;
    async findEnderecosByPerson(idPessoa: number): Promise<IEndereco[]> {
        const enderecos = await this.api.get<IEndereco[]>(
            `enderecos?idPessoa=${idPessoa}`
        );

        return enderecos.data;
    }
}

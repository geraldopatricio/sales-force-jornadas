import { AxiosInstance } from "axios";

import { PierApi } from "../../apis/PierApi";
import { IPessoaDetalhes } from "../../domain/pier/PessoaDetalhes";
import { IPessoaDetalhesRepository } from "../IPessoaDetalhesRepository";

export class PessoaDetalhesRepository implements IPessoaDetalhesRepository {
    private pierApi: AxiosInstance = PierApi;
    async getByPessoaId(idPessoa: number): Promise<IPessoaDetalhes> {
        const response = await this.pierApi.get<IPessoaDetalhes>(
            `/pessoas-detalhes/${idPessoa}`
        );

        const pessoasDetalhes = response.data;

        return pessoasDetalhes;
    }
}

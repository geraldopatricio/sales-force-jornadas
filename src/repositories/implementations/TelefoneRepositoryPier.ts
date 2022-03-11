import { AxiosInstance } from "axios";

import { PierApi } from "../../apis/PierApi";
import { IResponseListTelefone, ITelefone } from "../../domain/pier/Telefone";
import { ITelefoneRepository } from "../ITelefoneRepository";

export class TelefoneRepositoryPier implements ITelefoneRepository {
    private api: AxiosInstance = PierApi;
    async getTelefonesByidPessoa(idPessoa: number): Promise<ITelefone[]> {
        const response = await this.api.get<IResponseListTelefone>(
            `/telefones?idPessoa=${idPessoa}`
        );
        console.log(response.data);
        return response.data.content;
    }
}

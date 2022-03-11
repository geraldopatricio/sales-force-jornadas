import { AxiosInstance } from "axios";

import { PierApi } from "../../apis/PierApi";
import { IConta } from "../../domain/pier/Conta";
import { IContaRepository } from "../IContaRepository";

export class ContaRepository implements IContaRepository {
    private pierApi: AxiosInstance = PierApi;
    async getContaById(idConta: number): Promise<IConta> {
        const response = await this.pierApi.get<IConta>(`/contas/${idConta}`);
        const conta = response.data;
        return conta;
    }
}

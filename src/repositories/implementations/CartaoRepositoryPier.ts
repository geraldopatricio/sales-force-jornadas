import { PierApi } from "../../apis/PierApi";
import { ICartao } from "../../domain/pier/Cartao";
import { ICartaoRepository } from "../ICartaoRepository";

export class CartaoRepositoryPier implements ICartaoRepository {
    private pier = PierApi;

    async getCartaoById(idCartao: number): Promise<ICartao> {
        const response = await this.pier.get<ICartao>(`/cartoes/${idCartao}`);
        return response.data;
    }
}

import { ICartao } from "../domain/pier/Cartao";

export interface ICartaoRepository {
    getCartaoById(idCartao: number): Promise<ICartao>;
}

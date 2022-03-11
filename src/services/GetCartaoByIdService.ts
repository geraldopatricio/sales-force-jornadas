import { ICartao } from "../domain/pier/Cartao";
import { CartaoRepositoryPier } from "../repositories/implementations/CartaoRepositoryPier";

export class GetCartaoByIdService {
    constructor(private cartaoRepository: CartaoRepositoryPier) {}
    async execute(idCartao: number): Promise<ICartao> {
        return this.cartaoRepository.getCartaoById(idCartao);
    }
}

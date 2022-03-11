import { ICartao } from "../domain/pier/Cartao";

export class IsCartaoCancelado {
    async execute(cartao: ICartao): Promise<boolean> {
        try {
            if (cartao.idStatus === 15) {
                return true;
            }
            return false;
        } catch (error) {
            // retorna false pois cartão pode estar em preparacao
            return false;
        }
    }
}

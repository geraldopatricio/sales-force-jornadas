import { CartaoRepositoryPier } from "../repositories/implementations/CartaoRepositoryPier";
import { GetCartaoByIdService } from "../services/GetCartaoByIdService";

export function getGetCartaoByIdService() {
    const cartaoRepository = new CartaoRepositoryPier();
    return new GetCartaoByIdService(cartaoRepository);
}

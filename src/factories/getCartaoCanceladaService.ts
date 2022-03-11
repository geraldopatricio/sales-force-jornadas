import { CartaoRepositoryPier } from "../repositories/implementations/CartaoRepositoryPier";
import { IsCartaoCancelado } from "../services/IsCartaoCancelado";

export function getIsCartaoCanceladoService() {
    const isCartaoCancelado = new IsCartaoCancelado();
    return isCartaoCancelado;
}

import { ContaRepository } from "../repositories/implementations/ContaRepositoryPier";
import { GetContaService } from "../services/GetContaService";

export function getConta() {
    const contaRepository = new ContaRepository();
    return new GetContaService(contaRepository);
}

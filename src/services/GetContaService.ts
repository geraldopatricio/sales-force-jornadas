import { IConta } from "../domain/pier/Conta";
import { IContaRepository } from "../repositories/IContaRepository";

export class GetContaService {
    constructor(private contaRepository: IContaRepository) {}
    async execute(idConta: number): Promise<IConta> {
        const conta = await this.contaRepository.getContaById(idConta);
        return conta;
    }
}

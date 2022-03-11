import { IEnderecoRepository } from "../repositories/IEnderecoRepository";

export class GetEnderecoPierService {
    constructor(private enderecoRepository: IEnderecoRepository) {}

    async execute(idPessoa: number) {
        const endereco = await this.enderecoRepository.findEnderecosByPerson(
            idPessoa
        );

        return endereco;
    }
}

import { IPessoaDetalhes } from "../domain/pier/PessoaDetalhes";
import { IPessoaDetalhesRepository } from "../repositories/IPessoaDetalhesRepository";

export class GetPessoasDetalhesService {
    constructor(private pessoaDetalhesRepository: IPessoaDetalhesRepository) {}

    execute(idPessoa: number): Promise<IPessoaDetalhes> {
        const pessoaDetalhes =
            this.pessoaDetalhesRepository.getByPessoaId(idPessoa);
        return pessoaDetalhes;
    }
}

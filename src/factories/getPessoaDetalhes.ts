import { PessoaDetalhesRepository } from "../repositories/implementations/PessoaDetalhesRepository";
import { GetPessoasDetalhesService } from "../services/GetPessoasDetalhesService";

export function getPessoaDetalhes() {
    const pessoaDetalhesRepository = new PessoaDetalhesRepository();
    return new GetPessoasDetalhesService(pessoaDetalhesRepository);
}

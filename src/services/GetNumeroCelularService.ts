import { ITelefone } from "../domain/pier/Telefone";
import { ITelefoneRepository } from "../repositories/ITelefoneRepository";

export class GetNumeroCelularService {
    private telefoneRepository: ITelefoneRepository;
    constructor(telefoneRepository: ITelefoneRepository) {
        this.telefoneRepository = telefoneRepository;
    }

    async execute(idPessoa: number): Promise<ITelefone> {
        const TIPOTELEFONECELULAR = 18;
        try {
            const listaTelefone =
                await this.telefoneRepository.getTelefonesByidPessoa(idPessoa);
            const telefoneCelular = listaTelefone.find(
                (telefone) => telefone.idTipoTelefone === TIPOTELEFONECELULAR
            );

            return telefoneCelular;
        } catch (error) {
            return undefined;
        }
    }
}

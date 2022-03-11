import { IAcessoKibanaRepository } from "../repositories/IAcessoKibanaRepository";

export class GetAcessoKibanaTipoService {
    constructor(private acessoKibanaRepository: IAcessoKibanaRepository) {
        this.acessoKibanaRepository = acessoKibanaRepository;
    }

    async execute(numeroReceitaFederal: string) {
        const acesso = await this.acessoKibanaRepository.getByDsUsuario(
            numeroReceitaFederal
        );

        if (acesso.ds_sistema === "APLICATIVO") {
            return 1;
        }
        return 0;
    }
}

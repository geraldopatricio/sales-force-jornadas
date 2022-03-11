import { AcessoKibana } from "../entities/stage/AcessoKibana";

export interface IAcessoKibanaRepository {
    getByDsUsuario(dsUsuario: string): Promise<AcessoKibana>;
}

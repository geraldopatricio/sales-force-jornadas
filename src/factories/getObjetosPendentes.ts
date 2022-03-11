import { ObjetoRepositoryTypeORM } from "../repositories/implementations/ObjetoRepositoryTypeORM";
import { ObjetosPendentesRepository } from "../repositories/implementations/ObjetosPendentesRepositoryTypeOrm";
import { GetObjetosPendentesService } from "../services/GetObjetosPendentesService";

export function getObjetosPendentes() {
    const repository = new ObjetoRepositoryTypeORM();

    return new GetObjetosPendentesService(repository);
}

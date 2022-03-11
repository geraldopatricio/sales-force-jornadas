import { ObjetosPendentesRepository } from "../repositories/implementations/ObjetosPendentesRepositoryTypeOrm";
import { SaveObjetoPendenteService } from "../services/SaveObjetoPendenteService";

export function getSaveObjetoPendenteService() {
    const repository = new ObjetosPendentesRepository();

    const saveObjetoPendenteService = new SaveObjetoPendenteService(repository);
    return saveObjetoPendenteService;
}

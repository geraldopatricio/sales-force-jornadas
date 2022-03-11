import { ObjetoRepositoryTypeORM } from "../repositories/implementations/ObjetoRepositoryTypeORM";
import { GetObjetosService } from "../services/GetObjetosService";

export function getObjetos() {
    const objetoRepository = new ObjetoRepositoryTypeORM();
    const getObjetosService = new GetObjetosService(objetoRepository);
    return getObjetosService;
}

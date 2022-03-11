import { CouriersManager } from "../domain/couriers/CouriersManager";
import { Objeto } from "../entities/db_rastramento_cartoes/Objeto";

export class SetObjetoCouriersStrategyService {
    constructor(private couriersManager: CouriersManager) {}
    execute(objetos: Objeto[]): Objeto[] {
        objetos.forEach((objeto) => {
            const st = this.couriersManager.getStrategy(objeto.courier_id);
            objeto.setCourierStrategy(st);
        });
        return objetos;
    }
}

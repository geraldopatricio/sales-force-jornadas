import { CouriersManager } from "../domain/couriers/CouriersManager";
import { SetObjetoCouriersStrategyService } from "../services/SetObjetoCouriersStrategyService";

export function getSetObjetoCouriers() {
    const couriesManager = new CouriersManager();
    return new SetObjetoCouriersStrategyService(couriesManager);
}

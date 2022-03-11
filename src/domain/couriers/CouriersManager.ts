import { ICourierStatusTracking } from "./CourierStatusTracking";
import { FlashStatusTracking } from "./FlashStatusTracking";
import { RemessaExpressaStatusTracking } from "./RemessaExpressaStatusTracking";
import { TotalExpressStatusTracking } from "./TotalExpressStatusTracking";

export class CouriersManager {
    private couriersStrategies: Array<ICourierStatusTracking>;
    constructor() {
        this.couriersStrategies = [
            new FlashStatusTracking(),
            new RemessaExpressaStatusTracking(),
            new TotalExpressStatusTracking(),
        ];
    }

    getStrategy(idCourier: number): ICourierStatusTracking {
        let strategy: ICourierStatusTracking;
        this.couriersStrategies.forEach((courierInstance) => {
            if (courierInstance.accept(idCourier)) {
                strategy = courierInstance;
            }
        });

        return strategy;
    }
}

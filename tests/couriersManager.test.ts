import { CouriersManager } from "../src/domain/couriers/CouriersManager";
import { FlashStatusTracking } from "../src/domain/couriers/FlashStatusTracking";
import { RemessaExpressaStatusTracking } from "../src/domain/couriers/RemessaExpressaStatusTracking";
import { TotalExpressStatusTracking } from "../src/domain/couriers/TotalExpressStatusTracking";
import { Objeto } from "../src/entities/db_rastramento_cartoes/Objeto";

describe("testa courierManager", () => {
    const couriersManager = new CouriersManager();

    it("deve retornar courier remessaExpress quando courier = 1", () => {
        const idCourier = 1;

        const courier = couriersManager.getStrategy(idCourier);

        expect(courier).toBeInstanceOf(RemessaExpressaStatusTracking);
    });

    it("deve retornar courier Flash quando courier = 2", () => {
        const idCourier = 2;

        const courier = couriersManager.getStrategy(idCourier);

        expect(courier).toBeInstanceOf(FlashStatusTracking);
    });

    it("deve retornar courier TotalExpress quando courier = 3", () => {
        const idCourier = 3;

        const courier = couriersManager.getStrategy(idCourier);

        expect(courier).toBeInstanceOf(TotalExpressStatusTracking);
    });
});

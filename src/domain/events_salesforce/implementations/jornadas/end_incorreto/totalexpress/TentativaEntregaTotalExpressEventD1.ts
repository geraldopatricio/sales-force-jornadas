import { CouriesId } from "../../../../../../config/CouriesId";
import { IObjetoStatusRequestDto } from "../../../../../../dto/IObjetoStatusRequest";
import { Status } from "../../../../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../../../../EventSalesforce";

export class TentativaEntregaTotalExpressEventD1 extends EventSalesforce {
    private etapa = 1;
    private status: Status = "ENDERECO_INCORRETO";
    private courier: CouriesId = CouriesId.TotalExpress;
    constructor() {
        super("tentativaEntregaTotal");
    }
    // PUSH, SMS, EMAIL
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "TENTATIVA_TOTAL";
        return dto;
    }

    accept({ status, idCourier, etapa }: IPropsAccept) {
        return (
            status === this.status &&
            this.courier === idCourier &&
            this.etapa === etapa
        );
    }
}

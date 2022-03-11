import { CouriesId } from "../../../config/CouriesId";
import { IObjetoStatusRequestDto } from "../../../dto/IObjetoStatusRequest";
import { Status } from "../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../EventSalesforce";

export class RetireCartaoCorreiosEvent extends EventSalesforce {
    private status: Status = "AGUARDANDO_RETIRADA";
    private courier: CouriesId = CouriesId.RemessaExpress;
    constructor() {
        super("tentativaEntregaCorreios");
    }
    // apenas push e sms
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        // remove email do objeto base
        delete dto.Data.email;
        dto.Data.status_cartao = "RETIRE_CARTAO";
        return dto;
    }

    accept({ status, idCourier }: IPropsAccept) {
        return status === this.status && this.courier === idCourier;
    }
}

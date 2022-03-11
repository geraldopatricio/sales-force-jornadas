import { IObjetoStatusRequestDto } from "../../../dto/IObjetoStatusRequest";
import { Status } from "../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../EventSalesforce";

export class ClienteAusenteEvent extends EventSalesforce {
    status: Status = "CLIENTE_AUSENTE";
    constructor() {
        super("clienteAusente");
    }
    // push, email, sms
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "AUSENTE";
        return dto;
    }

    accept({ status }: IPropsAccept) {
        return status === this.status;
    }
}

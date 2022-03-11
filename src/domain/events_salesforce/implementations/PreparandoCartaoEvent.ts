import { IObjetoStatusRequestDto } from "../../../dto/IObjetoStatusRequest";
import { Status } from "../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../EventSalesforce";

export class PreparandoCartaoEvent extends EventSalesforce {
    private status: Status = "PREPARANDO_CARTAO";
    constructor() {
        super("preparandoCartao");
    }
    // push, sms e email
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "PREPARANDO_CARTAO";
        return dto;
    }

    accept({ status }: IPropsAccept) {
        return status === this.status;
    }
}

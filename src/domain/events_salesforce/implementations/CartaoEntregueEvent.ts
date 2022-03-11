import { IObjetoStatusRequestDto } from "../../../dto/IObjetoStatusRequest";
import { Status } from "../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../EventSalesforce";

export class CartaoEntregueEvent extends EventSalesforce {
    private status: Status = "CARTAO_ENTREGUE";
    constructor() {
        super("cartaoEntregue");
    }
    // push, sms, email
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        // remove email do objeto base
        dto.Data.status_cartao = "CARTAO_ENTREGUE";
        return dto;
    }

    accept({ status }: IPropsAccept) {
        return status === this.status;
    }
}

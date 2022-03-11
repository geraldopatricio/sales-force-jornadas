import { IObjetoStatusRequestDto } from "../../../dto/IObjetoStatusRequest";
import { Status } from "../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../EventSalesforce";

export class SaiuParaEntregaEvent extends EventSalesforce {
    private status: Status = "SAIU_PARA_ENTREGA";
    constructor() {
        super("saiuParaEntrega");
    }
    // apenas push e sms
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        // remove email do objeto base
        delete dto.Data.email;
        dto.Data.status_cartao = "SAIU_PARA_ENTREGA";
        return dto;
    }

    accept({ status }: IPropsAccept) {
        return status === this.status;
    }
}

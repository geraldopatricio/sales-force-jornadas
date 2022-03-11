import { IObjetoStatusRequestDto } from "../../../../../dto/IObjetoStatusRequest";
import { Status } from "../../../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../../../EventSalesforce";

export class CartaoDevolvidoEventD1 extends EventSalesforce {
    private etapa = 1;
    private status: Status = "DEVOLVIDO";
    constructor() {
        super("cartaoDevolvido");
    }
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "CARTAO_DEVOLVIDO";
        return dto;
    }

    accept({ status, etapa }: IPropsAccept) {
        return status === this.status && this.etapa === etapa;
    }
}

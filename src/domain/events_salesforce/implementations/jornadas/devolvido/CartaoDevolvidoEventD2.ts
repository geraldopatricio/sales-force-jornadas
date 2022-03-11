import { IObjetoStatusRequestDto } from "../../../../../dto/IObjetoStatusRequest";
import { Status } from "../../../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../../../EventSalesforce";

export class CartaoDevolvidoEventD2 extends EventSalesforce {
    constructor() {
        super("cartaoDevolvido");
    }
    private status: Status = "DEVOLVIDO";
    private etapa = 2;
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "CARTAO_DEVOLVIDO";
        return dto;
    }

    accept({ status, etapa }: IPropsAccept) {
        return status === this.status && this.etapa === etapa;
    }
}

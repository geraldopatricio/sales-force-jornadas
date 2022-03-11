import { IObjetoStatusRequestDto } from "../../../dto/IObjetoStatusRequest";
import { Status } from "../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../EventSalesforce";

export class EmRotaEvent extends EventSalesforce {
    private status: Status = "EM_ROTA";
    constructor() {
        super("emRota");
    }
    // push, sms, email
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "EM_ROTA";
        dto.Data.codigo_rastreamento = props.objeto.id_externo;
        return dto;
    }

    accept({ status }: IPropsAccept) {
        return status === this.status;
    }
}

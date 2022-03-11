import { CouriesId } from "../../../../../config/CouriesId";
import { IObjetoStatusRequestDto } from "../../../../../dto/IObjetoStatusRequest";
import { Status } from "../../../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../../../EventSalesforce";
// Utilizado na jornada de end_incorreto
export class TentativaEntregaCorreiosEventD1 extends EventSalesforce {
    private etapa = 1;
    private status: Status = "AGUARDANDO_RETIRADA";
    private courier: CouriesId = CouriesId.RemessaExpress;
    constructor() {
        super("tentativaEntregaCorreios");
    }
    // push, sms, email
    ggetDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "TENTATIVA_CORREIOS";
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

import { CouriesId } from "../../../../../config/CouriesId";
import { IObjetoStatusRequestDto } from "../../../../../dto/IObjetoStatusRequest";
import { Status } from "../../../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../../../EventSalesforce";
// Utilizado na jornada de end_incorreto
export class TentativaEntregaCorreiosEventD4 extends EventSalesforce {
    private etapa = 4;
    private status: Status = "AGUARDANDO_RETIRADA";
    private courier: CouriesId = CouriesId.RemessaExpress;
    constructor() {
        super("tentativaEntregaCorreios");
    }
    // push, sms
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        // remove email do objeto base
        delete dto.Data.email;

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

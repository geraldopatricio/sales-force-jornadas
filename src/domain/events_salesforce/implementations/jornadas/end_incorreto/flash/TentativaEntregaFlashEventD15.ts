import { CouriesId } from "../../../../../../config/CouriesId";
import { IObjetoStatusRequestDto } from "../../../../../../dto/IObjetoStatusRequest";
import { Status } from "../../../../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../../../../EventSalesforce";

export class TentativaEntregaFlashEventD15 extends EventSalesforce {
    private etapa = 7;
    private status: Status = "ENDERECO_INCORRETO";
    private courier: CouriesId = CouriesId.Flash;
    constructor() {
        super("tentativaEntregaFlash");
    }
    // EMAIL, PUSH, SMS
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        dto.Data.status_cartao = "TENTATIVA_FLASH";
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

import { CouriesId } from "../../../../../../config/CouriesId";
import { IObjetoStatusRequestDto } from "../../../../../../dto/IObjetoStatusRequest";
import { Status } from "../../../../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../../../../EventSalesforce";

export class TentativaEntregaFlashEventD5 extends EventSalesforce {
    private etapa = 5;
    private status: Status = "ENDERECO_INCORRETO";
    private courier: CouriesId = CouriesId.Flash;
    constructor() {
        super("tentativaEntregaFlash");
    }
    // PUSH
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        // remove email e telefone do objeto base
        delete dto.Data.email;
        delete dto.Data.telefone;
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

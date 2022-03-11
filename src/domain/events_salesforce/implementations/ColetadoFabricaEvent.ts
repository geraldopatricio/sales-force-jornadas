import { IObjetoStatusRequestDto } from "../../../dto/IObjetoStatusRequest";
import { Status } from "../../couriers/CourierStatusTracking";
import {
    EventSalesforce,
    IPropsAccept,
    IPropsGetDtoEvent,
} from "../EventSalesforce";

export class ColetadoFabricaEvent extends EventSalesforce {
    private status: Status = "COLETADO";
    constructor() {
        super("coletadoFabrica");
    }
    // PUSH
    getDTOEvent(props: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        const dto = super.getDTOEvent(props);
        // remove email do objeto base
        delete dto.Data.email;
        delete dto.Data.telefone;
        dto.Data.status_cartao = "COLETADO_FABRICA";
        return dto;
    }

    accept({ status }: IPropsAccept) {
        return status === this.status;
    }
}

import { AxiosResponse } from "axios";

import { IObjetoStatusRequestDto } from "../dto/IObjetoStatusRequest";

export interface ISalesforceRepository {
    saveObjetoEvent(data: IObjetoStatusRequestDto): Promise<AxiosResponse>;
}

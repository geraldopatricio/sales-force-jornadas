import { AxiosResponse } from "axios";

import { IObjetoStatusRequestDto } from "../dto/IObjetoStatusRequest";
import { ISalesforceRepository } from "../repositories/ISalesforceRepository";

export class SendDataToSalesforce {
    constructor(private repository: ISalesforceRepository) {}

    async execute(data: IObjetoStatusRequestDto): Promise<AxiosResponse> {
        const response = await this.repository.saveObjetoEvent(data);
        console.log(
            "Enviado: ",
            response.status,
            " ",
            response.data,
            "\n Data => ",
            data
        );
        return response.data;
    }
}

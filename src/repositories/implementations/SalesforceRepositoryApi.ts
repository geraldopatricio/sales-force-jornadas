import { SalesforceApi } from "../../apis/SalesforceApi";
import { IObjetoStatusRequestDto } from "../../dto/IObjetoStatusRequest";
import { ISalesforceRepository } from "../ISalesforceRepository";

export class SalesforceRepository implements ISalesforceRepository {
    private api = SalesforceApi;
    async saveObjetoEvent(data: IObjetoStatusRequestDto) {
        const response = await this.api.post("/", data);
        return response;
    }
}

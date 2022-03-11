import { SalesforceRepository } from "../repositories/implementations/SalesforceRepositoryApi";
import { SendDataToSalesforce } from "../services/SendDataToSalesforce";

export function getSendDataToSalesforce() {
    const salesforceRepository = new SalesforceRepository();
    return new SendDataToSalesforce(salesforceRepository);
}

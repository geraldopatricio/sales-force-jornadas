import { EventSalesforceManager } from "../domain/events_salesforce/EventSalesforceManager";
import { CreateDataRequestSalesforce } from "../services/CreateDataRequestSalesforce";

export function getCreateDataRequestSalesforce() {
    const eventManager = new EventSalesforceManager();
    return new CreateDataRequestSalesforce(eventManager);
}

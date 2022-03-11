import { EventSalesforceManager } from "../domain/events_salesforce/EventSalesforceManager";
import { IConta } from "../domain/pier/Conta";
import { IPessoaDetalhes } from "../domain/pier/PessoaDetalhes";
import { ITelefone } from "../domain/pier/Telefone";
import { IObjetoStatusRequestDto } from "../dto/IObjetoStatusRequest";
import { IdEnvioSalesforce } from "../entities/db_rastramento_cartoes/IdEnvioSalesforce";
import { Objeto } from "../entities/db_rastramento_cartoes/Objeto";
import { Produto } from "../entities/stage/Produto";
/**
 * CreateDataRequestSalesforce é o serviço que retorna os dados que serão enviados para salesforce
 * de acordo com o status atual do objeto, a etapa que deve ser enviada e da courier responsável por ele.
 */
export class CreateDataRequestSalesforce {
    constructor(private eventManager: EventSalesforceManager) {}
    async execute(
        objeto: Objeto,
        conta: IConta,
        pessoaDetalhes: IPessoaDetalhes,
        telefoneCelular: ITelefone,
        idEnvioSalesforce: IdEnvioSalesforce,
        produto: Produto
    ): Promise<IObjetoStatusRequestDto> {
        const status = objeto.getStatus();
        const idCourier = objeto.courier_id;
        const etapa = objeto.objeto_pendente_info
            ? objeto.objeto_pendente_info.getEtapa()
            : 1;
        const params = {
            status,
            idCourier,
            etapa,
        };
        const event = this.eventManager.getEvent(params);
        await event.configApiEvent();
        const paramsDTO = {
            objeto,
            conta,
            pessoaDetalhes,
            telefoneCelular,
            idEnvioSalesforce,
            produto,
        };
        const dto = event.getDTOEvent(paramsDTO);

        return dto;
    }
}

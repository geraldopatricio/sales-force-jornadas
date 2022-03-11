// import { Objeto } from "../../entities/db_rastramento_cartoes/Objeto";
// import { Status } from "../couriers/CourierStatusTracking";

import {
    typeEvent,
    repositorioChavesSalesforce,
} from "../../config/SalesforceApiConfig";
import { IObjetoStatusRequestDto } from "../../dto/IObjetoStatusRequest";
import { IdEnvioSalesforce } from "../../entities/db_rastramento_cartoes/IdEnvioSalesforce";
import { Objeto } from "../../entities/db_rastramento_cartoes/Objeto";
import { Produto } from "../../entities/stage/Produto";
import { Status } from "../couriers/CourierStatusTracking";
import { IConta } from "../pier/Conta";
import { IPessoaDetalhes } from "../pier/PessoaDetalhes";
import { ITelefone } from "../pier/Telefone";

export interface IPropsAccept {
    status: Status;
    idCourier?: number;
    etapa?: number;
}

export interface IPropsGetDtoEvent {
    objeto: Objeto;
    conta: IConta;
    pessoaDetalhes?: IPessoaDetalhes;
    telefoneCelular?: ITelefone;
    idEnvioSalesforce: IdEnvioSalesforce;
    produto: Produto;
}

export abstract class EventSalesforce {
    private apiEvent: string;
    constructor(private apiEventName: typeEvent) {}

    async configApiEvent() {
        this.apiEvent = await repositorioChavesSalesforce.getApiEvent(
            this.apiEventName
        );
    }
    abstract accept(props: IPropsAccept): boolean;
    getDTOEvent({
        objeto,
        conta,
        telefoneCelular,
        pessoaDetalhes,
        idEnvioSalesforce,
        produto,
    }: IPropsGetDtoEvent): IObjetoStatusRequestDto {
        if (!this.apiEvent) {
            throw new Error(
                "It must call configApiEvent before using getDTOEvent"
            );
        }
        const nome_cartao_loja = produto.dsProduto;
        const primeiro_nome = this.getFirstName({ nomeCompleto: conta.nome });
        const { email } = pessoaDetalhes;
        const telefone = this.formatTelefone(telefoneCelular);
        const idParaEnviar = idEnvioSalesforce.getProximoId().toString();
        const fl_app = 1;
        const dto: IObjetoStatusRequestDto = {
            ContactKey: conta.numeroReceitaFederal,
            EventDefinitionKey: this.apiEvent,
            Data: {
                nu_cpf: conta.numeroReceitaFederal,
                id_conta: objeto.id_conta,
                primeiro_nome,
                ...(telefone && { telefone }),
                ...(email && { email }),
                id_cartao: objeto.id_cartao,
                id_envio: idParaEnviar,
                nome_cartao_loja,
                fl_app: 1,
                locale: "pt-br",
            },
        };
        return dto;
    }

    public formatTelefone(telefoneCelular: ITelefone): string {
        if (telefoneCelular) {
            const ONLY_NUMBER_PATTERN = /\d+/g;
            const REGEX_MATCH_LEADING_ZERO = /^0+/;
            const ddd_only_numbers = telefoneCelular.ddd
                .match(ONLY_NUMBER_PATTERN)
                .join("")
                .replace(REGEX_MATCH_LEADING_ZERO, "");

            const numero_onlynumbers = telefoneCelular.telefone
                .match(ONLY_NUMBER_PATTERN)
                .join("");
            return `55${ddd_only_numbers}${numero_onlynumbers}`;
        }

        return undefined;
    }

    protected getFirstName({ nomeCompleto }: { nomeCompleto: string }): string {
        if (nomeCompleto) {
            const primeiro_nome = nomeCompleto.split(" ")[0];
            const primeiro_nome_formatado =
                primeiro_nome[0].toUpperCase() +
                primeiro_nome.slice(1).toLowerCase();
            return primeiro_nome_formatado;
        }
        return nomeCompleto;
    }
}

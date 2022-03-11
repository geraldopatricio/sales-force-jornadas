export interface IObjetoStatusRequestDto {
    ContactKey: string;
    EventDefinitionKey: string;
    Data: {
        nu_cpf: string;
        id_conta: number;
        telefone?: string;
        email?: string;
        primeiro_nome?: string;
        locale?: string;
        fl_app?: number;
        status_cartao?: string;
        id_cartao?: number;
        id_envio?: string;
        nome_cartao_loja?: string;
        codigo_rastreamento?: string;
    };
}

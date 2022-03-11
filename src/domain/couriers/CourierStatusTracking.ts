import { Objeto } from "../../entities/db_rastramento_cartoes/Objeto";

export type Status =
    | "PREPARANDO_CARTAO"
    | "COLETADO"
    | "DEVOLVIDO"
    | "CARTAO_ENTREGUE"
    | "EM_ROTA"
    | "SAIU_PARA_ENTREGA"
    | "AGUARDANDO_RETIRADA"
    | "ENDERECO_INCORRETO"
    | "CLIENTE_AUSENTE";

export type Rule = string[];

export type RuleGeneral = Record<string, Rule>;

type ManyRules = Record<string, RuleGeneral> | RuleGeneral;

export abstract class ICourierStatusTracking {
    protected rules: ManyRules;
    abstract execute(objeto: Objeto): Status;
    abstract accept(id_courier: number): boolean;
}

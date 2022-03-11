import { CouriesId } from "../../config/CouriesId";
import { HistoricoObjeto } from "../../entities/db_rastramento_cartoes/HistoricoObjeto";
import { Objeto } from "../../entities/db_rastramento_cartoes/Objeto";
import {
    ICourierStatusTracking,
    Status,
    RuleGeneral,
} from "./CourierStatusTracking";

export class RemessaExpressaStatusTracking extends ICourierStatusTracking {
    private courierId = CouriesId.RemessaExpress;

    rules = {
        DEVOLVIDO: {
            BDE: [
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "10",
                "12",
                "13",
                "19",
                "21",
                "22",
                "23",
                "26",
                "28",
                "33",
                "34",
                "36",
                "37",
                "50",
                "51",
                "52",
                "62",
                "86",
                "89",
            ],
            BDI: [
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "10",
                "12",
                "13",
                "19",
                "21",
                "22",
                "23",
                "26",
                "28",
                "33",
                "34",
                "36",
                "37",
                "50",
                "51",
                "52",
                "62",
                "86",
                "89",
            ],
            BDR: [
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "10",
                "12",
                "13",
                "19",
                "21",
                "22",
                "23",
                "26",
                "28",
                "33",
                "34",
                "36",
                "37",
                "50",
                "51",
                "52",
                "62",
                "86",
                "89",
            ],
            CO: ["11"],
            FC: ["04", "05", "09", "51"],
            PAR: ["24"],
            OEC: ["09"],
        },
        PREPARANDO_CARTAO: {
            CO: ["02", "03", "05"],
        },

        SAIU_PARA_ENTREGA: {
            OEC: ["01"],
        },

        AGUARDANDO_RETIRADA: {
            BDE: ["24"],
            BDI: ["24"],
            BDR: ["24"],
            LDI: ["01", "02", "03", "04", "11", "13", "14"],
        },

        ENTREGUE: {
            BDE: ["01", "67", "68", "70"],
            BDI: ["01", "67", "68", "70"],
            BDR: ["01", "67", "68", "70"],
            CO: ["08"],
        },

        COLETADO: {
            CO: ["01"],
            PO: ["01", "09"],
        },

        EM_ROTA: {
            BDE: [
                "2",
                "9",
                "15",
                "18",
                "20",
                "30",
                "32",
                "35",
                "39",
                "45",
                "46",
                "47",
                "53",
                "69",
            ],
            BDI: [
                "2",
                "9",
                "15",
                "18",
                "20",
                "30",
                "32",
                "35",
                "39",
                "45",
                "46",
                "47",
                "53",
                "69",
            ],
            BDR: [
                "2",
                "9",
                "15",
                "18",
                "20",
                "30",
                "32",
                "35",
                "39",
                "45",
                "46",
                "47",
                "53",
                "69",
            ],
            CO: ["07"],
            DO: ["01", "02"],
            FC: ["02", "03", "10", "24"],
            PAR: ["15", "16", "18", "20", "28"],
            RO: ["01"],
        },

        CLIENTE_AUSENTE: {
            BDE: ["25"],
            BDI: ["25"],
            BDR: ["25"],
            FC: ["07"],
        },
    };

    execute(objeto: Objeto): Status {
        const historico_objetos = objeto.historicos_objeto;

        const {
            EM_ROTA,
            DEVOLVIDO,
            ENTREGUE,
            AGUARDANDO_RETIRADA,
            COLETADO,
            CLIENTE_AUSENTE,
            PREPARANDO_CARTAO,
        } = this.rules;
        const isEmRota = this.check_rule(historico_objetos, EM_ROTA);
        const isDevolvido = this.check_rule(historico_objetos, DEVOLVIDO);
        const isEntregue = this.check_rule(historico_objetos, ENTREGUE);
        const isAguardandoRetirada = this.check_rule(
            historico_objetos,
            AGUARDANDO_RETIRADA
        );

        const isColetado = this.check_rule(historico_objetos, COLETADO);
        const isAusente = this.check_rule(historico_objetos, CLIENTE_AUSENTE);
        const isPreparandoCartao = this.check_rule(
            historico_objetos,
            PREPARANDO_CARTAO
        );
        let status: Status;
        if (isPreparandoCartao) status = "PREPARANDO_CARTAO";
        if (isColetado) status = "COLETADO";
        if (isEmRota) status = "EM_ROTA";
        if (isAguardandoRetirada) status = "AGUARDANDO_RETIRADA";
        if (isAusente) status = "CLIENTE_AUSENTE";
        if (isEntregue) status = "CARTAO_ENTREGUE";
        if (isDevolvido) status = "DEVOLVIDO";
        return status;
    }

    accept(id_courier: number) {
        return id_courier === this.courierId;
    }

    private check_rule(
        historico_objeto: HistoricoObjeto[],
        rule: RuleGeneral
    ): boolean {
        let result = false;
        historico_objeto.forEach((historico) => {
            result = this.validate_rule(historico, rule);
        });

        return result;
    }

    private validate_rule(
        historico: HistoricoObjeto,
        rule: RuleGeneral
    ): boolean {
        let result = false;
        if (rule[historico.situacao]) {
            rule[historico.situacao].forEach((status) => {
                if (status === historico.status) {
                    result = true;
                }
            });
        }
        return result;
    }
}

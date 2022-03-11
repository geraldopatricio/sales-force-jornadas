import { CouriesId } from "../../config/CouriesId";
import { HistoricoObjeto } from "../../entities/db_rastramento_cartoes/HistoricoObjeto";
import { Objeto } from "../../entities/db_rastramento_cartoes/Objeto";
import { ICourierStatusTracking, Status, Rule } from "./CourierStatusTracking";

export class TotalExpressStatusTracking extends ICourierStatusTracking {
    private courierId = CouriesId.TotalExpress;

    rules = {
        PREPARANDO_CARTAO: ["0"],
        COLETADO: ["83", "84"],
        EM_ROTA: ["15", "38", "50", "80", "91", "106", "107"],
        SAIU_PARA_ENTREGA: ["104"],
        ENTREGUE: ["1"],
        DEVOLVIDO: [
            "9",
            "10",
            "11",
            "14",
            "16",
            "18",
            "19",
            "23",
            "24",
            "25",
            "26",
            "27",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36",
            "40",
            "51",
            "56",
            "61",
            "71",
            "72",
            "73",
            "90",
            "94",
        ],

        CLIENTE_AUSENTE: ["8", "20", "21"],

        ENDERECO_INCORRETO: [
            "6",
            "13",
            "37",
            "39",
            "41",
            "42",
            "44",
            "45",
            "46",
            "47",
            "49",
            "52",
            "53",
            "59",
            "95",
        ],
    };

    execute(objeto: Objeto): Status {
        // PEGAR ULTIMO EVENTO E DECIDIR QUAL STATUS É AGORA
        const historico_objeto = objeto.historicos_objeto;
        const {
            ENDERECO_INCORRETO,
            CLIENTE_AUSENTE,
            EM_ROTA,
            DEVOLVIDO,
            SAIU_PARA_ENTREGA,
            COLETADO,
            ENTREGUE,
            PREPARANDO_CARTAO,
        } = this.rules;

        const isEnderecoIncorreto = this.check_rule(
            historico_objeto,
            ENDERECO_INCORRETO
        );
        const isClienteAusente = this.check_rule(
            historico_objeto,
            CLIENTE_AUSENTE
        );
        const isEmRota = this.check_rule(historico_objeto, EM_ROTA);
        const isDevolvido = this.check_rule(historico_objeto, DEVOLVIDO);
        const isSaiuParaEntrega = this.check_rule(
            historico_objeto,
            SAIU_PARA_ENTREGA
        );
        const isColetado = this.check_rule(historico_objeto, COLETADO);
        const isEntregue = this.check_rule(historico_objeto, ENTREGUE);
        const isPreparandoCartao = this.check_rule(
            historico_objeto,
            PREPARANDO_CARTAO
        );

        let status: Status;
        if (isPreparandoCartao) status = "PREPARANDO_CARTAO";
        if (isColetado) status = "COLETADO";
        if (isEmRota) status = "EM_ROTA";
        if (isSaiuParaEntrega) status = "SAIU_PARA_ENTREGA";
        if (isEntregue) status = "CARTAO_ENTREGUE";
        if (isDevolvido) status = "DEVOLVIDO";
        if (isEnderecoIncorreto) status = "ENDERECO_INCORRETO";
        if (isClienteAusente) status = "CLIENTE_AUSENTE";

        return status;
    }

    accept(id_courier: number) {
        return id_courier === this.courierId;
    }

    private check_rule(
        historico_objetos: HistoricoObjeto[],
        rule: Rule
    ): boolean {
        let result = false;
        historico_objetos.forEach((historico) => {
            result = this.validate_rule(historico, rule);
        });

        return result;
    }

    private validate_rule(historico: HistoricoObjeto, rule: Rule): boolean {
        let result = false;

        rule.forEach((rule_entity) => {
            if (rule_entity === historico.status) {
                result = true;
            }
        });

        return result;
    }
}

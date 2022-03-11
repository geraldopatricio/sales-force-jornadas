import { CouriesId } from "../../config/CouriesId";
import { Objeto } from "../../entities/db_rastramento_cartoes/Objeto";
import { ICourierStatusTracking, Status } from "./CourierStatusTracking";

export class FlashStatusTracking extends ICourierStatusTracking {
    private courierId = CouriesId.Flash;

    rules = {
        PREPARANDO_CARTAO: ["1100"],
        COLETADO: ["1400", "1620", "3000"],
        EM_ROTA: [
            "1050",
            "2000",
            "2050",
            "2200",
            "4200",
            "4220",
            "4255",
            "6800",
        ],

        SAIU_PARA_ENTREGA: ["4100"],

        ENTREGUE: ["2500", "4250", "4300"],

        DEVOLVIDO: ["1130", "1500", "2700", "3010", "5500", "6400", "6600"],

        ENDERECO_INCORRETO: ["7100", "7110"],

        CLIENTE_AUSENTE: [""],
    };

    execute(objeto: Objeto): Status {
        const historico_objeto = objeto.historicos_objeto;
        const {
            PREPARANDO_CARTAO,
            EM_ROTA,
            ENDERECO_INCORRETO,
            COLETADO,
            ENTREGUE,
            SAIU_PARA_ENTREGA,
            DEVOLVIDO,
            CLIENTE_AUSENTE,
        } = this.rules;

        const isEnderecoIncorreto = this.check_rule(
            historico_objeto,
            ENDERECO_INCORRETO
        );
        const isEmRota = this.check_rule(historico_objeto, EM_ROTA);
        const isEntregue = this.check_rule(historico_objeto, ENTREGUE);
        const isColetado = this.check_rule(historico_objeto, COLETADO);
        const isSaiuParaEntrega = this.check_rule(
            historico_objeto,
            SAIU_PARA_ENTREGA
        );
        const isDevolvido = this.check_rule(historico_objeto, DEVOLVIDO);
        const isAusente = this.check_rule(historico_objeto, CLIENTE_AUSENTE);
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
        if (isEnderecoIncorreto) status = "ENDERECO_INCORRETO";
        if (isAusente) status = "CLIENTE_AUSENTE";
        if (isDevolvido) status = "DEVOLVIDO";

        return status;
    }

    accept(id_courier: number) {
        return id_courier === this.courierId;
    }

    private check_rule(historico_objetos, rule): boolean {
        let result = false;
        historico_objetos.forEach((historico) => {
            result = this.validate_rule(historico, rule);
        });

        return result;
    }

    private validate_rule(historico, rule): boolean {
        let result = false;

        rule.forEach((rule_entity) => {
            if (rule_entity === historico.status) {
                result = true;
            }
        });

        return result;
    }
}

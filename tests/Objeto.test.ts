import { FlashStatusTracking } from "../src/domain/couriers/FlashStatusTracking";
import { RemessaExpressaStatusTracking } from "../src/domain/couriers/RemessaExpressaStatusTracking";
import { TotalExpressStatusTracking } from "../src/domain/couriers/TotalExpressStatusTracking";
import { HistoricoObjeto } from "../src/entities/db_rastramento_cartoes/HistoricoObjeto";
import { Objeto } from "../src/entities/db_rastramento_cartoes/Objeto";

describe("Testa status dos objetos TotalExpress", () => {
    const cases = [
        { status: "0", expected: "PREPARANDO_CARTAO" },
        { status: "83", expected: "COLETADO" },
        { status: "15", expected: "EM_ROTA" },
        { status: "104", expected: "SAIU_PARA_ENTREGA" },
        { status: "1", expected: "CARTAO_ENTREGUE" },
        { status: "9", expected: "DEVOLVIDO" },
        { status: "6", expected: "ENDERECO_INCORRETO" },
        { status: "8", expected: "CLIENTE_AUSENTE" },
        { status: undefined, expected: undefined },
    ];

    it.each(cases)("status deve ser $expected", ({ status, expected }) => {
        const objeto = new Objeto();
        const courier = new TotalExpressStatusTracking();
        objeto.setCourierStrategy(courier);
        const unknown_event = new HistoricoObjeto();
        unknown_event.status = status;
        objeto.historicos_objeto = [unknown_event];

        const result = objeto.getStatus();
        expect(result).toBe(expected);
    });
});

describe("Testa status dos objetos Flash", () => {
    const cases = [
        { status: "1100", expected: "PREPARANDO_CARTAO" },
        { status: "1400", expected: "COLETADO" },
        { status: "1050", expected: "EM_ROTA" },
        { status: "4100", expected: "SAIU_PARA_ENTREGA" },
        { status: "2500", expected: "CARTAO_ENTREGUE" },
        { status: "1130", expected: "DEVOLVIDO" },
        { status: "7100", expected: "ENDERECO_INCORRETO" },
        { status: undefined, expected: undefined },
    ];

    it.each(cases)("status deve ser $expected", ({ status, expected }) => {
        const objeto = new Objeto();
        const courier = new FlashStatusTracking();
        objeto.setCourierStrategy(courier);
        const unknown_event = new HistoricoObjeto();
        unknown_event.status = status;
        objeto.historicos_objeto = [unknown_event];

        const result = objeto.getStatus();
        expect(result).toBe(expected);
    });
});

describe("Testa status dos objetos Remessa", () => {
    const cases = [
        { status: "02", situacao: "CO", expected: "PREPARANDO_CARTAO" },
        { status: "01", situacao: "CO", expected: "COLETADO" },
        { status: "2", situacao: "BDE", expected: "EM_ROTA" },
        { status: "01", situacao: "BDI", expected: "CARTAO_ENTREGUE" },
        { status: "03", situacao: "BDE", expected: "DEVOLVIDO" },
        { status: "24", situacao: "BDE", expected: "AGUARDANDO_RETIRADA" },
        { status: "25", situacao: "BDE", expected: "CLIENTE_AUSENTE" },
        { status: undefined, situcao: "", expected: undefined },
    ];

    it.each(cases)(
        "status deve ser $expected",
        ({ status, situacao, expected }) => {
            const objeto = new Objeto();
            const courier = new RemessaExpressaStatusTracking();
            objeto.setCourierStrategy(courier);
            const unknown_event = new HistoricoObjeto();
            unknown_event.status = status;
            unknown_event.situacao = situacao;
            objeto.historicos_objeto = [unknown_event];

            const result = objeto.getStatus();
            expect(result).toBe(expected);
        }
    );
});

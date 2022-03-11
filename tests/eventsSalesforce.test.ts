import { CouriesId } from "../src/config/CouriesId";
import {
    EventSalesforce,
    IPropsAccept,
} from "../src/domain/events_salesforce/EventSalesforce";
import { EventSalesforceManager } from "../src/domain/events_salesforce/EventSalesforceManager";
import { CartaoEntregueEvent } from "../src/domain/events_salesforce/implementations/CartaoEntregueEvent";
import { ClienteAusenteEvent } from "../src/domain/events_salesforce/implementations/ClienteAusenteEvent";
import { ColetadoFabricaEvent } from "../src/domain/events_salesforce/implementations/ColetadoFabricaEvent";
import { EmRotaEvent } from "../src/domain/events_salesforce/implementations/EmRotaEvent";
import {
    CartaoDevolvidoEventD1,
    CartaoDevolvidoEventD2,
    CartaoDevolvidoEventD3,
    CartaoDevolvidoEventD4,
} from "../src/domain/events_salesforce/implementations/jornadas/devolvido";
import {
    TentativaEntregaFlashEventD1,
    TentativaEntregaFlashEventD15,
    TentativaEntregaFlashEventD2,
    TentativaEntregaFlashEventD3,
    TentativaEntregaFlashEventD4,
    TentativaEntregaFlashEventD5,
    TentativaEntregaFlashEventD6,
} from "../src/domain/events_salesforce/implementations/jornadas/end_incorreto/flash";
import {
    TentativaEntregaTotalExpressEventD1,
    TentativaEntregaTotalExpressEventD2,
    TentativaEntregaTotalExpressEventD3,
    TentativaEntregaTotalExpressEventD4,
    TentativaEntregaTotalExpressEventD5,
    TentativaEntregaTotalExpressEventD6,
} from "../src/domain/events_salesforce/implementations/jornadas/end_incorreto/totalexpress";
import {
    TentativaEntregaCorreiosEventD1,
    TentativaEntregaCorreiosEventD2,
    TentativaEntregaCorreiosEventD3,
    TentativaEntregaCorreiosEventD4,
    TentativaEntregaCorreiosEventD5,
} from "../src/domain/events_salesforce/implementations/jornadas/retire_cartao";
import { PreparandoCartaoEvent } from "../src/domain/events_salesforce/implementations/PreparandoCartaoEvent";
import { RetireCartaoCorreiosEvent } from "../src/domain/events_salesforce/implementations/RetireCartaoCorreiosEvent";
import { SaiuParaEntregaEvent } from "../src/domain/events_salesforce/implementations/SaiuParaEntregaEvent";
import { ITelefone } from "../src/domain/pier/Telefone";

describe("Verifica se eventos estão sendo preenchidos", () => {
    const eventSalesforceManager = new EventSalesforceManager();
    it("deve pegar evento de PREPARANDO_CARTAO", () => {
        const params: IPropsAccept = {
            status: "PREPARANDO_CARTAO",
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(PreparandoCartaoEvent);
    });

    it("deve pegar evento de EM_ROTA", () => {
        const params: IPropsAccept = {
            status: "EM_ROTA",
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(EmRotaEvent);
    });

    it("deve pegar evento de COLETADO_FABRICA", () => {
        const params: IPropsAccept = {
            status: "COLETADO",
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(ColetadoFabricaEvent);
    });

    it("deve pegar evento de CLIENTE_AUSENTE", () => {
        const params: IPropsAccept = {
            status: "CLIENTE_AUSENTE",
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(ClienteAusenteEvent);
    });

    it("deve pegar evento de CARTAO_ENTREGUE", () => {
        const params: IPropsAccept = {
            status: "CARTAO_ENTREGUE",
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(CartaoEntregueEvent);
    });

    it("deve pegar evento de SAIU_PARA_ENTREGA", () => {
        const params: IPropsAccept = {
            status: "SAIU_PARA_ENTREGA",
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(SaiuParaEntregaEvent);
    });

    it("deve pegar evento de RETIRE_CARTAO_CORREIOS", () => {
        const params: IPropsAccept = {
            status: "AGUARDANDO_RETIRADA",
            idCourier: CouriesId.RemessaExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(RetireCartaoCorreiosEvent);
    });

    it("Deve retornar DEVOLVIDO ETAPA 1", () => {
        const params: IPropsAccept = {
            status: "DEVOLVIDO",
            etapa: 1,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(CartaoDevolvidoEventD1);
    });

    it("Deve retornar DEVOLVIDO ETAPA 2", () => {
        const params: IPropsAccept = {
            status: "DEVOLVIDO",
            etapa: 2,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(CartaoDevolvidoEventD2);
    });

    it("Deve retornar DEVOLVIDO ETAPA 3", () => {
        const params: IPropsAccept = {
            status: "DEVOLVIDO",
            etapa: 3,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(CartaoDevolvidoEventD3);
    });

    it("Deve retornar DEVOLVIDO ETAPA 4 (D7)", () => {
        const params: IPropsAccept = {
            status: "DEVOLVIDO",
            etapa: 4,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(CartaoDevolvidoEventD4);
    });

    it("Deve retornar RETIRE_CARTAO CORREIOS ETAPA 1 (D1)", () => {
        const params: IPropsAccept = {
            status: "AGUARDANDO_RETIRADA",
            etapa: 1,
            idCourier: CouriesId.RemessaExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaCorreiosEventD1);
    });

    it("Deve retornar RETIRE_CARTAO CORREIOS ETAPA 2 (D2)", () => {
        const params: IPropsAccept = {
            status: "AGUARDANDO_RETIRADA",
            etapa: 2,
            idCourier: CouriesId.RemessaExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaCorreiosEventD2);
    });

    it("Deve retornar RETIRE_CARTAO CORREIOS ETAPA 3 (D3)", () => {
        const params: IPropsAccept = {
            status: "AGUARDANDO_RETIRADA",
            etapa: 3,
            idCourier: CouriesId.RemessaExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaCorreiosEventD3);
    });

    it("Deve retornar RETIRE_CARTAO CORREIOS ETAPA 4 (D4)", () => {
        const params: IPropsAccept = {
            status: "AGUARDANDO_RETIRADA",
            etapa: 4,
            idCourier: CouriesId.RemessaExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaCorreiosEventD4);
    });

    it("Deve retornar RETIRE_CARTAO CORREIOS ETAPA 5 (D5)", () => {
        const params: IPropsAccept = {
            status: "AGUARDANDO_RETIRADA",
            etapa: 5,
            idCourier: CouriesId.RemessaExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaCorreiosEventD5);
    });

    it("Deve retornar ENDERECO_INCORRETO FLASH ETAPA 1 (D1)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 1,
            idCourier: CouriesId.Flash,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaFlashEventD1);
    });

    it("Deve retornar ENDERECO_INCORRETO FLASH ETAPA 2 (D2)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 2,
            idCourier: CouriesId.Flash,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaFlashEventD2);
    });

    it("Deve retornar ENDERECO_INCORRETO FLASH ETAPA 3 (D3)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 3,
            idCourier: CouriesId.Flash,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaFlashEventD3);
    });

    it("Deve retornar ENDERECO_INCORRETO FLASH ETAPA 4 (D4)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 4,
            idCourier: CouriesId.Flash,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaFlashEventD4);
    });

    it("Deve retornar ENDERECO_INCORRETO FLASH ETAPA 5 (D5)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 5,
            idCourier: CouriesId.Flash,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaFlashEventD5);
    });

    it("Deve retornar ENDERECO_INCORRETO FLASH ETAPA 6 (D6)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 6,
            idCourier: CouriesId.Flash,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaFlashEventD6);
    });

    it("Deve retornar ENDERECO_INCORRETO FLASH ETAPA 7 (D15)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 7,
            idCourier: CouriesId.Flash,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaFlashEventD15);
    });

    it("Deve retornar ENDERECO_INCORRETO TOTALEXPRESS ETAPA 1 (D1)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 1,
            idCourier: CouriesId.TotalExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaTotalExpressEventD1);
    });

    it("Deve retornar ENDERECO_INCORRETO TOTALEXPRESS ETAPA 2 (D2)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 2,
            idCourier: CouriesId.TotalExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaTotalExpressEventD2);
    });

    it("Deve retornar ENDERECO_INCORRETO TOTALEXPRESS ETAPA 3 (D3)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 3,
            idCourier: CouriesId.TotalExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaTotalExpressEventD3);
    });

    it("Deve retornar ENDERECO_INCORRETO TOTALEXPRESS ETAPA 4 (D4)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 4,
            idCourier: CouriesId.TotalExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaTotalExpressEventD4);
    });

    it("Deve retornar ENDERECO_INCORRETO TOTALEXPRESS ETAPA 5 (D5)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 5,
            idCourier: CouriesId.TotalExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaTotalExpressEventD5);
    });

    it("Deve retornar ENDERECO_INCORRETO TOTALEXPRESS ETAPA 6 (D6)", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 6,
            idCourier: CouriesId.TotalExpress,
        };

        const event = eventSalesforceManager.getEvent(params);

        expect(event).toBeInstanceOf(TentativaEntregaTotalExpressEventD6);
    });

    it("Deve lançar exceção quando não encontrar um evento", () => {
        const params: IPropsAccept = {
            status: "ENDERECO_INCORRETO",
            etapa: 7, // não existe essa etapa
            idCourier: CouriesId.TotalExpress,
        };
        expect(() => {
            eventSalesforceManager.getEvent(params);
        }).toThrowError();
    });
});

class DummyEventSalesforce extends EventSalesforce {
    // classe usada somente para testar class abstrata EventSalesforce
    accept(props: IPropsAccept): boolean {
        throw new Error("Method not implemented.");
    }
}
// apesar de ter o apiEvent para preparando_cartao, como é classe pai, serve para todos eventos.
describe("EventSalesforce formato telefone", () => {
    const eventSalesforce = new DummyEventSalesforce("preparandoCartao");

    it("deve retornar número de telefone com formato 55dd9xxxxxxxx quando DDD for 0DD", () => {
        const telefone: ITelefone = {
            id: 1,
            ddd: "011",
            telefone: "987654321",
        };
        const telefoneFormatado = eventSalesforce.formatTelefone(telefone);

        expect(telefoneFormatado).toBe("5511987654321");
    });

    it("deve retornar número de telefone com formato 55dd9xxxxxxxx quando DDD for DD", () => {
        const telefone: ITelefone = {
            id: 1,
            ddd: "11",
            telefone: "987654321",
        };
        const telefoneFormatado = eventSalesforce.formatTelefone(telefone);

        expect(telefoneFormatado).toBe("5511987654321");
    });

    it("deve retornar undefined quando celular undefined", () => {
        const telefoneFormatado = eventSalesforce.formatTelefone(undefined);

        expect(telefoneFormatado).toBeUndefined();
    });
});

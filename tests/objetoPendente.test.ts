import { CouriesId } from "../src/config/CouriesId";
import { Objeto } from "../src/entities/db_rastramento_cartoes/Objeto";
import { ObjetoPendente } from "../src/entities/db_rastramento_cartoes/ObjetoPendente";

describe("criar ObjetoPendente status normal", () => {
    let objeto: Objeto;
    let objetoPendente: ObjetoPendente;

    beforeEach(() => {
        objeto = new Objeto();
        objeto.courier_id = CouriesId.RemessaExpress;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
    });

    it("deve criar objetoPendente com status normal", () => {
        expect(objetoPendente.jornada).toBe("PREPARANDO_CARTAO");
    });

    it("deve ser criado como finalizado quando o status for normal", () => {
        expect(objetoPendente.isFinalizado()).toBeTruthy();
    });

    it("deve conter o id do objeto a que objetoPendente pertence", () => {
        expect(objetoPendente.objeto_id).toBe(objeto.id);
    });

    it("deve conter o id da courier a que o objeto pertence", () => {
        expect(objetoPendente.objeto_id).toBe(objeto.id);
    });

    it("deve conter o objeto a que pertence o objetoPendente", () => {
        expect(objetoPendente.objeto).toEqual(objeto);
    });

    it("deve ser marcado para enviar a salesforce ao criar pela primeira vez", () => {
        expect(objetoPendente.isToBeSend()).toBeTruthy();
    });

    it("nao deve ter ultima_etapa_enviada", () => {
        expect(objetoPendente.getEtapa()).toBeUndefined();
    });
});

describe("criar ObjetoPendente status repetido (ENDERECO_INCORRETO, DEVOLVIDO, AGUARDANDO RETIRADA)", () => {
    let objeto: Objeto;
    let objetoPendente: ObjetoPendente;

    beforeEach(() => {
        objeto = new Objeto();
        objeto.courier_id = CouriesId.TotalExpress;
        objeto.id = 0;
        objeto.status = "ENDERECO_INCORRETO";
        objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
    });

    it("deve criar objetoPendente", () => {
        expect(objetoPendente.jornada).toBe("ENDERECO_INCORRETO");
    });

    it("não deve estar finalizado", () => {
        expect(objetoPendente.isFinalizado()).toBeFalsy();
    });
    it("deve ser marcado para enviar a salesforce", () => {
        expect(objetoPendente.isToBeSend()).toBeTruthy();
    });
    it("deve ter etapa = 1", () => {
        expect(objetoPendente.getEtapa()).toBe(1);
    });

    it("deve aceitar aguardando retirada com courier remessa", () => {
        objetoPendente.courier_id = CouriesId.RemessaExpress;
        expect(() => {
            objetoPendente.setJornada("AGUARDANDO_RETIRADA");
        }).not.toThrowError();
    });

    it("deve aceitar endereco_incorreto com courier total", () => {
        objetoPendente.courier_id = CouriesId.TotalExpress;
        expect(() => {
            objetoPendente.setJornada("ENDERECO_INCORRETO");
        }).not.toThrowError();
    });

    it("deve aceitar endereco_incorreto com courier flash", () => {
        objetoPendente.courier_id = CouriesId.Flash;
        expect(() => {
            objetoPendente.setJornada("ENDERECO_INCORRETO");
        }).not.toThrowError();
    });

    it("não deve aceitar aguardando retirada com courier flash", () => {
        objetoPendente.courier_id = CouriesId.Flash;
        expect(() => {
            objetoPendente.setJornada("AGUARDANDO_RETIRADA");
        }).toThrowError();
    });

    it("não deve aceitar aguardando retirada com courier total", () => {
        objetoPendente.courier_id = CouriesId.TotalExpress;
        expect(() => {
            objetoPendente.setJornada("AGUARDANDO_RETIRADA");
        }).toThrowError();
    });

    it("não deve aceitar endereco_incorreto com courier remessa", () => {
        objetoPendente.courier_id = CouriesId.TotalExpress;
        expect(() => {
            objetoPendente.setJornada("AGUARDANDO_RETIRADA");
        }).toThrowError();
    });
});

describe("Objeto pendente mudar de status normal para normal", () => {
    it("Status deve mudar para outro", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";

        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);

        objetoPendente.setJornada("EM_ROTA");

        expect(objetoPendente.jornada).toBe("EM_ROTA");
    });

    it("Status deve estar finalizado", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);

        objetoPendente.setJornada("EM_ROTA");

        expect(objetoPendente.isFinalizado()).toBeTruthy();
    });

    it("Deve ser enviado para salesforce caso jornada seja diferente", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);

        objetoPendente.setJornada("EM_ROTA");
        expect(objetoPendente.isToBeSend()).toBeTruthy();
    });

    it("Deve dizer que é o mesmo status", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);

        const result = objetoPendente.isSameStatus("PREPARANDO_CARTAO");

        expect(result).toBeTruthy();
    });

    it("Deve dizer que status é diferente quando for status diferente", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);

        const result = objetoPendente.isSameStatus("CARTAO_ENTREGUE");

        expect(result).toBeFalsy();
    });

    it("Deve dizer ,quando status é diferente, que é para ser enviado a salesforce", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
        objetoPendente.isSameStatus("CARTAO_ENTREGUE");

        const isToBeSend = objetoPendente.isToBeSend();

        expect(isToBeSend).toBeTruthy();
    });

    it("Deve dizer, quando status é igual, que não é para ser enviado a salesforce", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
        objetoPendente.isSameStatus("PREPARANDO_CARTAO");

        const isToBeSend = objetoPendente.isToBeSend();

        expect(isToBeSend).toBeFalsy();
    });

    it("deve dizer para não enviar se for mesmo status", () => {
        const objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "PREPARANDO_CARTAO";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);

        objetoPendente.setJornada("PREPARANDO_CARTAO");

        expect(objetoPendente.isToBeSend()).toBeFalsy();
    });
});

describe("ObjetoPendente mudanças de status normal para repetido", () => {
    it("deve mudar de status normal para status repetido", () => {
        const objeto = new Objeto();
        objeto.id = 1;
        objeto.courier_id = 2;
        objeto.status = "EM_ROTA";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
        objeto.status = "ENDERECO_INCORRETO";

        objetoPendente.setJornada(objeto.getStatus());

        expect(objetoPendente.jornada).toBe("ENDERECO_INCORRETO");
    });

    it("deve ter ultima_etapa_enviada = 1", () => {
        const objeto = new Objeto();
        objeto.id = 1;
        objeto.courier_id = CouriesId.Flash;
        objeto.status = "EM_ROTA";
        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
        objeto.status = "ENDERECO_INCORRETO";

        objetoPendente.setJornada(objeto.getStatus());

        expect(objetoPendente.getEtapa()).toBe(1);
    });

    it("deve não estar finalizado", () => {
        const objeto = new Objeto();
        objeto.id = 1;
        objeto.courier_id = CouriesId.Flash;
        objeto.status = "EM_ROTA";

        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
        expect(objetoPendente.jornada).toBe("EM_ROTA");

        objeto.status = "ENDERECO_INCORRETO";
        objetoPendente.setJornada(objeto.getStatus());

        expect(objetoPendente.isFinalizado()).toBeFalsy();
    });

    it("deve ser enviado para salesforce", () => {
        const objeto = new Objeto();
        objeto.id = 1;
        objeto.courier_id = CouriesId.RemessaExpress;
        objeto.status = "EM_ROTA";

        const objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);

        expect(objetoPendente.isToBeSend()).toBeTruthy();
    });
});

describe("ObjetoPendente mudar de status repetido para normal", () => {
    let objeto: Objeto;
    let objetoPendente: ObjetoPendente;

    beforeEach(() => {
        objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "ENDERECO_INCORRETO";

        objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
    });
    it("Status deve mudar para outro", () => {
        expect(objetoPendente.jornada).toBe("ENDERECO_INCORRETO");
        objetoPendente.setJornada("EM_ROTA");
        expect(objetoPendente.jornada).toBe("EM_ROTA");
    });
    it("Status deve estar finalizado", () => {
        objetoPendente.setJornada("EM_ROTA");
        expect(objetoPendente.isFinalizado()).toBeTruthy();
    });

    it("Deve ser enviado para salesforce", () => {
        objetoPendente.setJornada("EM_ROTA");
        expect(objetoPendente.isToBeSend()).toBeTruthy();
    });

    it("Deve dizer que é o mesmo status", () => {
        const result = objetoPendente.isSameStatus("ENDERECO_INCORRETO");
        expect(result).toBeTruthy();
    });

    it("nao deve ter ultima_etapa_enviada", () => {
        objetoPendente.setJornada("EM_ROTA");
        expect(objetoPendente.getEtapa()).toBeUndefined();
    });
});

describe("ObjetoPendente mudar de status repetido para status repetido", () => {
    let objeto: Objeto;
    let objetoPendente: ObjetoPendente;

    beforeEach(() => {
        objeto = new Objeto();
        objeto.courier_id = CouriesId.Flash;
        objeto.id = 1;
        objeto.status = "ENDERECO_INCORRETO";

        objetoPendente = ObjetoPendente.createNewObjetoPendente(objeto);
    });
    it("Status deve mudar para devolvido", () => {
        expect(objetoPendente.jornada).toBe("ENDERECO_INCORRETO");
        objetoPendente.setJornada("DEVOLVIDO");
        expect(objetoPendente.jornada).toBe("DEVOLVIDO");
    });
    it("Status não deve estar finalizado", () => {
        objetoPendente.setJornada("DEVOLVIDO");
        expect(objetoPendente.isFinalizado()).toBeFalsy();
    });

    it("Deve ser enviado para salesforce", () => {
        objetoPendente.setJornada("DEVOLVIDO");
        expect(objetoPendente.isToBeSend()).toBeTruthy();
    });

    it("deve ter ultima_etapa_enviada = 0", () => {
        objetoPendente.setJornada("DEVOLVIDO");
        expect(objetoPendente.getEtapa()).toBe(1);
    });
});

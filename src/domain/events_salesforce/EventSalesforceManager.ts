import { EventSalesforce, IPropsAccept } from "./EventSalesforce";
import { CartaoEntregueEvent } from "./implementations/CartaoEntregueEvent";
import { ClienteAusenteEvent } from "./implementations/ClienteAusenteEvent";
import { ColetadoFabricaEvent } from "./implementations/ColetadoFabricaEvent";
import { EmRotaEvent } from "./implementations/EmRotaEvent";
import * as devolvido from "./implementations/jornadas/devolvido";
import * as flashEndIncorreto from "./implementations/jornadas/end_incorreto/flash";
import * as totalEndIncorreto from "./implementations/jornadas/end_incorreto/totalexpress";
import * as correiosRetireCartao from "./implementations/jornadas/retire_cartao";
import { PreparandoCartaoEvent } from "./implementations/PreparandoCartaoEvent";
import { RetireCartaoCorreiosEvent } from "./implementations/RetireCartaoCorreiosEvent";
import { SaiuParaEntregaEvent } from "./implementations/SaiuParaEntregaEvent";

export class EventSalesforceManager {
    private instances: Array<EventSalesforce>;
    constructor() {
        this.instances = [
            new PreparandoCartaoEvent(),
            new CartaoEntregueEvent(),
            new ClienteAusenteEvent(),
            new EmRotaEvent(),
            new SaiuParaEntregaEvent(),
            new ColetadoFabricaEvent(),
            new devolvido.CartaoDevolvidoEventD1(),
            new devolvido.CartaoDevolvidoEventD2(),
            new devolvido.CartaoDevolvidoEventD3(),
            new devolvido.CartaoDevolvidoEventD4(),
            new RetireCartaoCorreiosEvent(),
            new correiosRetireCartao.TentativaEntregaCorreiosEventD1(),
            new correiosRetireCartao.TentativaEntregaCorreiosEventD2(),
            new correiosRetireCartao.TentativaEntregaCorreiosEventD3(),
            new correiosRetireCartao.TentativaEntregaCorreiosEventD4(),
            new correiosRetireCartao.TentativaEntregaCorreiosEventD5(),
            new flashEndIncorreto.TentativaEntregaFlashEventD1(),
            new flashEndIncorreto.TentativaEntregaFlashEventD2(),
            new flashEndIncorreto.TentativaEntregaFlashEventD3(),
            new flashEndIncorreto.TentativaEntregaFlashEventD4(),
            new flashEndIncorreto.TentativaEntregaFlashEventD5(),
            new flashEndIncorreto.TentativaEntregaFlashEventD6(),
            new flashEndIncorreto.TentativaEntregaFlashEventD15(),
            new totalEndIncorreto.TentativaEntregaTotalExpressEventD1(),
            new totalEndIncorreto.TentativaEntregaTotalExpressEventD2(),
            new totalEndIncorreto.TentativaEntregaTotalExpressEventD3(),
            new totalEndIncorreto.TentativaEntregaTotalExpressEventD4(),
            new totalEndIncorreto.TentativaEntregaTotalExpressEventD5(),
            new totalEndIncorreto.TentativaEntregaTotalExpressEventD6(),
        ];
    }
    getEvent(props: IPropsAccept): EventSalesforce {
        let strategy: EventSalesforce;
        this.instances.forEach((instance) => {
            if (instance.accept(props)) {
                strategy = instance;
            }
        });

        if (strategy === undefined) {
            throw new Error(
                `Evento não encontrado para esses parâmetros: ${props}`
            );
        }

        return strategy;
    }
}

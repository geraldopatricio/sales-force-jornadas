import { DateTime } from "luxon";
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { CouriesId } from "../../config/CouriesId";
import { Status } from "../../domain/couriers/CourierStatusTracking";
import { IEndereco } from "../../domain/pier/Endereco";
import { DateTimeTransforme } from "../../utils/DateTimeTransforme";
import { Objeto } from "./Objeto";

export interface ISetDataChecagem {
    days: number;
}

@Entity({ name: "pendente" })
export class ObjetoPendente {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column("int")
    objeto_id: number;

    @Column("int")
    courier_id: number;

    @Column({ name: "jornada_atual", type: "varchar", length: 30 })
    jornada: Status; // status atual desse objeto: end_incorreto ou devolvido,

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    private data_atualizacao: DateTime; // data de atualizacao quando o script acessa

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    private data_proxima_checagem: DateTime; // 11-01-2022 por exemplo, pode ter horário para maior precisão se requisitado

    @Column("bit")
    private finalizado: boolean; // se a jornada for finalizada ou alterado para status diferente de devolvido e end_incorreto

    @Column("int")
    private ultima_etapa_enviada: number;

    @OneToOne(() => Objeto, (objeto) => objeto.objeto_pendente_info)
    @JoinColumn({ name: "objeto_id" })
    objeto: Objeto;

    send: boolean;

    nextStep() {
        if (this.isJornadaEndIncorreto()) {
            // eslint-disable-next-line default-case
            switch (this.courier_id) {
                case CouriesId.TotalExpress: {
                    this.fluxoTotalExpressEnderecoIncorreto();
                    break;
                }

                case CouriesId.Flash: {
                    this.fluxoFlashEnderecoIncorreto();
                    break;
                }
            }
        } else if (this.isJornadaDevolvido()) {
            this.fluxoDevolvido();
        } else if (this.isJornadaRetireCartao()) {
            this.fluxoRetireCartao();
        }
    }

    private fluxoTotalExpressEnderecoIncorreto() {
        // eslint-disable-next-line default-case
        switch (this.ultima_etapa_enviada) {
            case 0: {
                this.ultima_etapa_enviada = 1;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 1: {
                this.ultima_etapa_enviada = 2;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 2: {
                this.ultima_etapa_enviada = 3;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 3: {
                this.ultima_etapa_enviada = 4;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 4: {
                this.ultima_etapa_enviada = 5;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 5: {
                this.ultima_etapa_enviada = 5;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 6: {
                this.marcarProximaJornadaComoDevolvido();
                break;
            }
        }
    }

    private fluxoFlashEnderecoIncorreto() {
        // eslint-disable-next-line default-case
        switch (this.ultima_etapa_enviada) {
            case 0: {
                this.ultima_etapa_enviada = 1;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 1: {
                this.ultima_etapa_enviada = 2;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 2: {
                this.ultima_etapa_enviada = 3;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 3: {
                this.ultima_etapa_enviada = 4;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 4: {
                this.ultima_etapa_enviada = 5;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 5: {
                this.ultima_etapa_enviada = 6;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 6: {
                this.ultima_etapa_enviada = 7;
                this.setDataChecagem({ days: 8 });
                break;
            }
            case 7: {
                this.marcarProximaJornadaComoDevolvido();
                break;
            }
        }
    }

    private fluxoDevolvido() {
        // eslint-disable-next-line default-case
        switch (this.ultima_etapa_enviada) {
            // 0 significa que não foi enviado nada.
            case 0: {
                this.ultima_etapa_enviada = 1;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 1: {
                this.ultima_etapa_enviada = 2;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 2: {
                this.ultima_etapa_enviada = 3;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 3: {
                this.ultima_etapa_enviada = 4;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 4: {
                this.marcarComoFinalizado();
            }
        }
    }

    private fluxoRetireCartao() {
        // eslint-disable-next-line default-case
        switch (this.ultima_etapa_enviada) {
            case 0: {
                this.ultima_etapa_enviada = 1;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 1: {
                this.ultima_etapa_enviada = 2;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 2: {
                this.ultima_etapa_enviada = 3;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 3: {
                this.ultima_etapa_enviada = 4;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 4: {
                this.ultima_etapa_enviada = 5;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 5: {
                this.ultima_etapa_enviada = 6;
                this.setDataChecagem({ days: 1 });
                break;
            }
            case 6: {
                this.marcarProximaJornadaComoDevolvido();
                break;
            }
        }
    }

    private newJornada(status: Status) {
        this.jornada = status;
        this.finalizado = false;
        this.ultima_etapa_enviada = 0;
        this.nextStep();
        this.atualizarDataAtualizacao();
        this.toBeSend();
    }

    private updateJornadaNormal(status: Status) {
        this.jornada = status;
        this.atualizarDataAtualizacao();
        this.ultima_etapa_enviada = undefined;
        this.finalizado = true;
        this.toBeSend();
    }

    private isJornadaRepetida(status: Status) {
        return (
            status === "DEVOLVIDO" ||
            status === "ENDERECO_INCORRETO" ||
            status === "AGUARDANDO_RETIRADA"
        );
    }

    private isToSetDevolvidoEtapa1(novoStatus: Status) {
        // Verifica que se é para iniciar jornada de devolvido se antes era end_incorreto ou retire seu cartão e se
        // estas jornadas anteriores não estavam finalizadas.
        return (
            !this.isFinalizado() &&
            (this.jornada === "ENDERECO_INCORRETO" ||
                this.jornada === "AGUARDANDO_RETIRADA") &&
            novoStatus === "DEVOLVIDO"
        );
    }

    setJornada(status: Status) {
        /* Só pode aceitar endereco_incorreto se for da total ou da flash. 
            Só pode aceitar aguardando_retirada se for da remessa
        */
        if (
            (status === "ENDERECO_INCORRETO" &&
                this.courier_id !== CouriesId.TotalExpress &&
                this.courier_id !== CouriesId.Flash) ||
            (status === "AGUARDANDO_RETIRADA" &&
                this.courier_id !== CouriesId.RemessaExpress)
        ) {
            throw new Error(
                `Status ${status} não pertence a courier id ${this.courier_id}`
            );
        }

        if (this.jornada) {
            if (this.isFinalizado()) {
                if (this.isJornadaRepetida(status)) {
                    this.newJornada(status);
                } else if (!this.isSameStatus(status))
                    this.updateJornadaNormal(status);
            } else if (!this.isFinalizado()) {
                if (this.isToSetDevolvidoEtapa1(status)) {
                    this.newJornada(status);
                }
                if (!this.isJornadaRepetida(status)) {
                    this.updateJornadaNormal(status);
                }
            }
            // bloco executado quando não tem jornada, ou seja, foi criado agora o objeto
        } else if (this.isJornadaRepetida(status)) {
            this.newJornada(status);
        } else {
            this.updateJornadaNormal(status);
        }
    }

    isToBeSend() {
        return this.send;
    }

    toBeSend() {
        this.send = true;
    }
    notToBeSend() {
        this.send = false;
    }
    cancelCartao() {
        this.marcarComoFinalizado();
        this.notToBeSend();
    }
    isSameStatus(status: Status) {
        // se for finalizado e for status repetido então deve dizer que é falso, pois
        // este é o caso que uma jornada repetida foi finalizada e deve recomeçar do zero.
        if (this.isFinalizado() && this.isJornadaRepetida(status)) {
            return false;
        }
        if (this.jornada === status) {
            this.notToBeSend();
            return true;
        }
        // retorna true se for mesmo status do anterior
        return false;
    }

    private marcarProximaJornadaComoDevolvido() {
        this.setJornada("DEVOLVIDO");
    }

    marcarComoFinalizado() {
        this.finalizado = true;
    }

    atualizarDataAtualizacao() {
        const now = DateTime.now();
        this.data_atualizacao = now;
    }

    isFinalizado() {
        return this.finalizado;
    }

    getEtapa() {
        return this.ultima_etapa_enviada;
    }

    isMesmoEndereco(enderecoPier: IEndereco): boolean {
        // aplicar metodo para comparar numero, logradouro
        const isCepDifferent = this.objeto.endereco.cep !== enderecoPier.cep;

        if (isCepDifferent) {
            return false;
        }

        const isBairroDifferent =
            this.objeto.endereco.bairro !== enderecoPier.bairro;
        if (isBairroDifferent) return false;

        const isCidadeDifferent =
            this.objeto.endereco.cidade !== enderecoPier.cidade;

        if (isCidadeDifferent) return false;

        const isUfDifferent = this.objeto.endereco.uf !== enderecoPier.uf;
        if (isUfDifferent) return false;

        return true;
    }

    isJornadaEndIncorreto(): boolean {
        return this.jornada === "ENDERECO_INCORRETO";
    }

    isJornadaDevolvido(): boolean {
        return this.jornada === "DEVOLVIDO";
    }

    private isJornadaRetireCartao() {
        return this.jornada === "AGUARDANDO_RETIRADA";
    }

    private setDataChecagem({ days }: ISetDataChecagem) {
        const data = DateTime.now()
            .set({ second: 0, millisecond: 0, minute: 0, hour: 0 })
            .plus({ days })
            .setZone("utc");
        this.data_proxima_checagem = data;
    }

    public static createNewObjetoPendente(objeto: Objeto) {
        const novoObjetoPendente = new ObjetoPendente();
        novoObjetoPendente.courier_id = objeto.courier_id;
        novoObjetoPendente.objeto_id = objeto.id;
        novoObjetoPendente.objeto = objeto;
        novoObjetoPendente.setJornada(objeto.getStatus());
        return novoObjetoPendente;
    }
}

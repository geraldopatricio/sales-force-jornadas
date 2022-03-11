import { DateTime } from "luxon";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
    OneToOne,
} from "typeorm";

import {
    ICourierStatusTracking,
    Status,
} from "../../domain/couriers/CourierStatusTracking";
import { DateTimeTransforme } from "../../utils/DateTimeTransforme";
import { EnderecoAtual } from "./EnderecoAtual";
import { HistoricoObjeto } from "./HistoricoObjeto";
import { ObjetoPendente } from "./ObjetoPendente";

@Entity({ name: "objetos" })
export class Objeto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("bigint")
    codigo_cartao: string;

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    data_postagem: DateTime;

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    data_coleta: DateTime;

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    data_baixa: DateTime;

    @Column("int")
    courier_id: number;

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    data_limite: DateTime;

    @Column("varchar", { length: 50 })
    id_externo: string;

    @Column("bigint")
    endereco_id: string;

    @Column("varchar", { length: 1024 })
    contrato: string;

    @Column("bigint")
    recebedor_id: string;

    @Column("int")
    id_conta: number;

    @Column("tinyint")
    flg_entregue: number;

    @Column("tinyint")
    flg_devolvido: number;

    @Column("tinyint")
    flg_ag_retirada: number;

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    data_atualizacao: DateTime;

    @Column("tinyint")
    flg_em_rota: number;

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    data_criacao: DateTime;

    @Column("varchar", { length: 150 })
    ds_motivo: string;

    @Column("int")
    id_cartao: number;

    @Column({ type: "datetime", transformer: new DateTimeTransforme() })
    data_liberacao_embossing: DateTime;

    @OneToMany(
        () => HistoricoObjeto,
        (historico_objeto) => historico_objeto.objeto
    )
    @JoinColumn({ referencedColumnName: "id_externo" })
    historicos_objeto: HistoricoObjeto[];

    @OneToOne(() => ObjetoPendente, (objeto_pendente) => objeto_pendente.objeto)
    objeto_pendente_info: ObjetoPendente;

    @OneToOne(() => EnderecoAtual)
    @JoinColumn({ name: "endereco_id" })
    endereco: EnderecoAtual;

    private courierStrategy: ICourierStatusTracking;
    status: Status;
    setCourierStrategy(courierStrategy: ICourierStatusTracking) {
        this.courierStrategy = courierStrategy;
    }
    getStatus() {
        if (this.courierStrategy === null) {
            throw new Error("A courier strategy must be set it.");
        }
        if (this.status) {
            return this.status;
        }
        const status = this.courierStrategy.execute(this);
        this.status = status;
        return status;
    }
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { Objeto } from "./Objeto";

@Entity({ name: "historico_objetos" })
export class HistoricoObjeto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("bigint")
    objeto_id: string;

    @Column("datetime")
    data_ocorrencia: Date;

    @Column("varchar", { length: 250 })
    ds_evento: string;

    @Column("varchar", { length: 50 })
    cidade: string;

    @Column("varchar", { length: 10 })
    status: string;

    @Column("varchar", { length: 100 })
    local: string;

    @Column("varchar", { length: 50 })
    situacao: string;

    @Column("bigint")
    cod_evento: string;

    @Column("varchar", { length: 50 })
    id_externo: number;

    @Column("varchar", { length: 20 })
    hawb_id: number;

    @ManyToOne(() => Objeto, (objeto) => objeto.historicos_objeto)
    @JoinColumn({ name: "id_externo", referencedColumnName: "id_externo" })
    objeto: Objeto;
}

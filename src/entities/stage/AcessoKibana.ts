import { Column, Entity } from "typeorm";

@Entity({ name: "VI_DW_T_LOG_ACESSO_KIBANA" })
export class AcessoKibana {
    @Column({ type: "varchar", length: 8000 })
    ds_usuario: string;

    @Column({ type: "date" })
    dt_acesso: Date;

    @Column({ type: "varchar", length: 50 })
    ds_sistema: string;

    @Column({ type: "varchar", length: 8000 })
    ds_marca: string;

    @Column({ type: "varchar", length: 8000 })
    ds_modelo: string;
}

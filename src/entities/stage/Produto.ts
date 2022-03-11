import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cdt_t_produto", database: "stage" })
export class Produto {
    @PrimaryColumn({ name: "id_produto" })
    id: number;

    @Column({ name: "ds_produto", type: "varchar", length: 50 })
    dsProduto: string;

    @Column({ name: "cd_bin", type: "int" })
    cdBin: string;

    @Column({ name: "ds_tipo_produto", type: "varchar", length: 50 })
    dsTipoProduto: string;

    @Column({ name: "ds_bandeira", type: "varchar", length: 25 })
    dsBandeira: string;

    @Column({ name: "id_fantasiabasica", type: "int" })
    idFantasiaBasica: number;

    @Column({ name: "cd_cedente", type: "varchar", length: 10 })
    cdCedente: string;

    @Column({ name: "tx_encargos_refin", type: "decimal" })
    txEncargosRefin: number;
}

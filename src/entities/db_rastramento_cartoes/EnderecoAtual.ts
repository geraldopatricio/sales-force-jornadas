import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "enderecos" })
export class EnderecoAtual {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    rua: string;

    @Column({ type: "varchar", length: 40 })
    bairro: string;

    @Column({ type: "varchar", length: 40 })
    cidade: string;

    @Column({ type: "varchar", length: 2 })
    uf: string;

    @Column({ type: "varchar", length: 9 })
    cep: string;
}

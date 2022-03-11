import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "idenviosalesforce" })
export class IdEnvioSalesforce {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("bigint")
    ultimo_id_envio_enviado: string;

    getProximoId() {
        const next = Number(this.ultimo_id_envio_enviado) + 1;
        this.setUltimoIdEnviado(next.toString());
        return this.ultimo_id_envio_enviado;
    }

    private setUltimoIdEnviado(id: string) {
        this.ultimo_id_envio_enviado = id;
    }
}

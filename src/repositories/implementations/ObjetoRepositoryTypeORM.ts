import { DateTime } from "luxon";
import { Brackets, getRepository, Repository } from "typeorm";

import { Objeto } from "../../entities/db_rastramento_cartoes/Objeto";
import { IObjetoRepository } from "../IObjetoRepository";

export class ObjetoRepositoryTypeORM implements IObjetoRepository {
    private objetosRepository: Repository<Objeto>;
    constructor() {
        this.objetosRepository = getRepository(Objeto);
    }
    async getObjetosByDataAtualizacaoLessThanTenMinutesAgo(): Promise<
        Objeto[]
    > {
        const data = DateTime.now()
            .minus({ minutes: 10 })
            .set({ millisecond: 0, second: 0 })
            .setZone("utc")
            .toISO();

        const objetos = await this.objetosRepository
            .createQueryBuilder("objeto")
            .leftJoinAndSelect("objeto.historicos_objeto", "historicos_objeto")
            .leftJoinAndSelect("objeto.endereco", "endereco")
            .leftJoinAndSelect(
                "objeto.objeto_pendente_info",
                "objeto_pendente.objeto"
            )
            .where("objeto.data_atualizacao >= :date", {
                date: data,
            })
            .andWhere(
                new Brackets((qb) => {
                    qb.where(
                        "historicos_objeto.data_ocorrencia >= :data_minima",
                        {
                            data_minima: "2022-02-04T03:00:00Z",
                        }
                    ).orWhere("historicos_objeto.data_ocorrencia IS NULL");
                })
            )
            .orderBy("data_ocorrencia", "ASC")
            .getMany();

        return objetos;
    }

    async getObjetosDataChecagemToday(): Promise<[Objeto[], number]> {
        const data = DateTime.now()
            .set({ second: 0, millisecond: 0, minute: 0, hour: 0 })
            .setZone("utc")
            .toISO();

        const [objetos, count] = await this.objetosRepository
            .createQueryBuilder("objeto")

            .leftJoinAndSelect(
                "objeto.historicos_objeto",
                "historicos_objeto.objeto"
            )
            .leftJoinAndSelect("objeto.endereco", "endereco")
            .leftJoinAndSelect("objeto.objeto_pendente_info", "objeto_pendente")
            .where("data_proxima_checagem >= :date", {
                date: data,
            })

            .andWhere("finalizado != :valor_true", { valor_true: true })
            .orderBy("data_ocorrencia", "ASC")

            .getManyAndCount();

        return [objetos, count];
    }
}

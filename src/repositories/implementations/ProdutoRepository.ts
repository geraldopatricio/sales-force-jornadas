import { getRepository, Repository } from "typeorm";

import { Produto } from "../../entities/stage/Produto";
import { IProdutoRepository } from "../IProdutosRepository";

export class ProdutoRepositoryTypeOrm implements IProdutoRepository {
    private produtosRepository: Repository<Produto> = getRepository(
        Produto,
        "stage"
    );
    async getProdutoById(idProduto: number): Promise<Produto> {
        const produto = await this.produtosRepository.findOne({
            where: { id: idProduto },
        });
        return produto;
    }
}

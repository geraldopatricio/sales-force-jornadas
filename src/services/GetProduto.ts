import { ICartao } from "../domain/pier/Cartao";
import { Produto } from "../entities/stage/Produto";
import { IProdutoRepository } from "../repositories/IProdutosRepository";

interface IProdutoIdCartao {
    cartao: ICartao;
}

export class GetProduto {
    constructor(private produtoRepository: IProdutoRepository) {}

    async execute({ cartao }: IProdutoIdCartao): Promise<Produto> {
        const { idProduto } = cartao;
        const produto = await this.produtoRepository.getProdutoById(idProduto);
        return produto;
    }
}

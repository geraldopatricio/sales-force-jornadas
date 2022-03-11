import { Produto } from "../entities/stage/Produto";

export interface IProdutoRepository {
    getProdutoById(idProduto: number): Promise<Produto>;
}

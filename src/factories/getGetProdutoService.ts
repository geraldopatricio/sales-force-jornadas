import { ProdutoRepositoryTypeOrm } from "../repositories/implementations/ProdutoRepository";
import { GetProduto } from "../services/GetProduto";

export function getGetProdutoService() {
    const repository = new ProdutoRepositoryTypeOrm();

    return new GetProduto(repository);
}

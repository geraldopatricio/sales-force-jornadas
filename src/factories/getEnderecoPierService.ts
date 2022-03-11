import { EnderecoRepositoryPier } from "../repositories/implementations/EnderecoRepositoryPier";
import { GetEnderecoPierService } from "../services/GetEnderecoPierService";

export function getEnderecoPierService() {
    const repository = new EnderecoRepositoryPier();
    return new GetEnderecoPierService(repository);
}

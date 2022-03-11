import { TelefoneRepositoryPier } from "../repositories/implementations/TelefoneRepositoryPier";
import { GetNumeroCelularService } from "../services/GetNumeroCelularService";

export function getNumeroCelular() {
    const telefoneRepositoryPier = new TelefoneRepositoryPier();
    return new GetNumeroCelularService(telefoneRepositoryPier);
}

export interface IEndereco {
    id: number;
    idPessoa: number;
    idTipoEndereco: number;
    cep: string;
    logradouro: string;
    numero: number;
    complemento: string;
    pontoReferencia: string;
    bairro: string;
    cidade: string;
    uf: string;
    pais: string;
    dataInclusao: string;
    dataUltimaAtualizacao: string;
    flagCorrespondencia: boolean;
    tempoResidenciaAnos: number;
    tempoResidenciaMeses: number;
}

export interface ICartao {
    id: number;

    flagTitular?: number;

    idPessoa?: number;

    sequencialCartao?: number;

    idConta?: number;

    idStatus?: number;

    dataStatus?: string;
    idEstagio?: number;

    dataEstagio?: string;

    numeroBin?: string;

    numeroCartao?: string;

    numeroCartaoHash?: string;

    numeroCartaoCriptografado?: string;

    dataEmissao?: string;

    dataValidade?: string;

    cartaoVirtual?: string;

    impressaoAvulsa?: string;

    dataImpressao?: string;

    nomeArquivoImpressao?: string;

    idProduto?: number;

    nomeImpresso?: string;

    codigoDesbloqueio?: string;

    tipoPortador?: string;

    idStatusCartao?: number;

    dataStatusCartao?: string;

    idEstagioCartao?: number;

    dataEstagioCartao?: string;

    dataGeracao?: string;

    flagVirtual?: number;

    flagImpressaoOrigemComercial?: number;

    arquivoImpressao?: string;

    portador?: string;

    flagCartaoMifare?: boolean;

    idImage?: number;

    descricaoTipoCartao?: number;

    tipoCartao?: number;

    idMifare?: number;

    matriculaMifare?: number;
}

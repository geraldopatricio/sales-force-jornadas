export interface ITelefone {
    id: number;
    idTipoTelefone?: number;
    idPessoa?: number;
    ddd?: string;
    telefone?: string;
    ramal?: string;
    status?: number;
}

export interface IResponseListTelefone {
    number?: number;
    size?: number;
    totalPages?: number;
    numberOfElements?: number;
    totalElements?: number;
    firstPage?: boolean;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    hasContent?: boolean;
    first?: boolean;
    last?: boolean;
    nextPage?: boolean;
    previousPage?: boolean;
    content?: ITelefone[];
}

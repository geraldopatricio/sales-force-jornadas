import { azureKeyVaults } from "./AzureKeyVaults";

interface IKeysApiEvents {
    cartaoEntregue?: string;
    clienteAusente?: string;
    coletadoFabrica?: string;
    emRota?: string;
    preparandoCartao?: string;
    saiuParaEntrega?: string;
    cartaoDevolvido?: string;
    retireCartaoCorreios?: string;
    tentativaEntregaCorreios?: string;
    tentativaEntregaFlash?: string;
    tentativaEntregaTotal?: string;
}

interface IRepositorioChaves {
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
    account_id?: string;
    url_login?: string;
    baseURL?: string;
    apiEvents?: IKeysApiEvents;
}

export type typeEvent =
    | "preparandoCartao"
    | "cartaoEntregue"
    | "clienteAusente"
    | "coletadoFabrica"
    | "emRota"
    | "saiuParaEntrega"
    | "cartaoDevolvido"
    | "retireCartaoCorreios"
    | "tentativaEntregaCorreios"
    | "tentativaEntregaFlash"
    | "tentativaEntregaTotal";

class RepositorioChaves {
    private repositorio: IRepositorioChaves = {};

    async getSalesforceApiConfig() {
        let grant_type: string;
        let client_id: string;
        let client_secret: string;
        let account_id: string;
        let url_login: string;
        if (
            (this.repositorio.account_id && this.repositorio.client_id,
            this.repositorio.client_secret,
            this.repositorio.account_id,
            this.repositorio.url_login)
        ) {
            grant_type = this.repositorio.grant_type;
            client_id = this.repositorio.client_id;
            client_secret = this.repositorio.client_secret;
            account_id = this.repositorio.account_id;
            url_login = this.repositorio.url_login;
        } else {
            [grant_type, client_id, client_secret, account_id, url_login] =
                await Promise.all([
                    azureKeyVaults.getSecret(process.env.xxx_GRANT_TYPE),

                    azureKeyVaults.getSecret(process.env.xxx_CLIENT_ID),

                    azureKeyVaults.getSecret(
                        process.env.xxx_CLIENT_SECRET
                    ),

                    azureKeyVaults.getSecret(process.env.xxx_ACCOUNT_ID),

                    azureKeyVaults.getSecret(process.env.xxx_URL_LOGIN),
                ]);
            // copia para fazer cache
            this.repositorio = {
                ...this.repositorio,
                grant_type,
                client_id,
                client_secret,
                account_id,
                url_login,
            };
        }

        return {
            grant_type,
            client_id,
            client_secret,
            account_id,
            url_login,
        };
    }

    async getSalesforceBaseURL() {
        let baseURL: string;
        if (this.repositorio.baseURL) baseURL = this.repositorio.baseURL;
        else {
            baseURL = await azureKeyVaults.getSecret(
                process.env.SALESFORCE_BASE_URL
            );

            this.repositorio = { ...this.repositorio, baseURL };
        }

        return { baseURL };
    }

    async getApiEvent(name: typeEvent) {
        const apiEvent = this.repositorio[name];
        if (apiEvent) {
            return apiEvent;
        }
        const apiEventKey = this.getEnvApiEventEnvByName(name);
        const apiEventAzure = await azureKeyVaults.getSecret(apiEventKey);
        this.repositorio[name] = apiEventAzure;
        return apiEventAzure;
    }

    private getEnvApiEventEnvByName(name: typeEvent) {
        const mapeamento: IKeysApiEvents = {
            cartaoEntregue: process.env.xxx_API_EVENT,
            clienteAusente: process.env.xxx_API_EVENT,
            coletadoFabrica: process.env.xxx_API_EVENT,
            emRota: process.env.EM_ROTA_API_EVENT,
            preparandoCartao: process.env.xxx_API_EVENT,
            saiuParaEntrega: process.env.xxx_API_EVENT,
            cartaoDevolvido: process.env.xxx_API_EVENT,
            retireCartaoCorreios: process.env.xxx_API_EVENT,
            tentativaEntregaCorreios:
                process.env.xxx_API_EVENT,
            tentativaEntregaFlash:
                process.env.xxxx_API_EVENT,
            tentativaEntregaTotal:
                process.env.xxx_API_EVENT,
        };

        return mapeamento[name];
    }
}

const repositorioChavesSalesforce = new RepositorioChaves();
export { repositorioChavesSalesforce };

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { repositorioChavesSalesforce } from "../config/SalesforceApiConfig";

interface IAxiosRequestConfigwithRetry extends AxiosRequestConfig {
    retry?: boolean;
}

const SalesforceApi = axios.create();

// Ideal fazer cache dessas informacoes

const getToken = async () => {
    const { grant_type, client_id, client_secret, account_id, url_login } =
        await repositorioChavesSalesforce.getSalesforceApiConfig();
    const requestData = {
        grant_type,
        client_id,
        client_secret,
        account_id,
    };
    const { data } = await axios.post(url_login, requestData);
    return data.access_token;
};
const handleResponse = (response: AxiosResponse) => response;

const addBaseURL = async (config: AxiosRequestConfig) => {
    const requestConfig = config;
    const { baseURL } =
        await repositorioChavesSalesforce.getSalesforceBaseURL();
    requestConfig.baseURL = baseURL;
    return requestConfig;
};

SalesforceApi.interceptors.request.use(addBaseURL);
/* Quando a requisiçao tem erro 401 (unauthorized), tenta-se novamente fazer login,
caso tenha sucesso, adiciona token ao header de todas as requisições e refaz a requisição novamente.
Qualquer outro erro é redirecionado para o cliente tratar */

async function handleResponseUnauthorized(error: AxiosError) {
    const originalRequest: IAxiosRequestConfigwithRetry = error.config;
    if (error.response.status === 401 && !!originalRequest.retry !== true) {
        originalRequest.retry = true;
        const access_token = await getToken();
        SalesforceApi.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        return SalesforceApi(originalRequest);
    }
    return Promise.reject(error);
}

SalesforceApi.interceptors.response.use(
    handleResponse,
    handleResponseUnauthorized
);

export { SalesforceApi };

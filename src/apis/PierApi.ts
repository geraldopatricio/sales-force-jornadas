import axios, { AxiosRequestConfig } from "axios";

import { pierRepositoryChaves } from "../config/PierConfig";

const PierApi = axios.create();

const AuthorizationHeaders = async (config: AxiosRequestConfig) => {
    const requestConfig = config;
    const { url, access_token, client_id } =
        await pierRepositoryChaves.getPierConfig();
    requestConfig.baseURL = url;
    requestConfig.headers.access_token = access_token;
    requestConfig.headers.client_id = client_id;
    return requestConfig;
};
PierApi.interceptors.request.use(AuthorizationHeaders);

export { PierApi };

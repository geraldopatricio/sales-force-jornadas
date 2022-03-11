import axios, { AxiosInstance, AxiosResponse } from "axios";

// declare module "axios" {
//     type AxiosResponse<T = any> = Promise<T>;
// }

export abstract class HttpWrapper {
    protected readonly instance: AxiosInstance;
    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });
        this.initializeResponseInterceptor();
    }

    protected initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this.handleResponse,
            this.handleError
        );
    };

    protected handleResponse = ({ data }: AxiosResponse) => data;
    protected handleError = (error: Error) => Promise.reject(error);
}

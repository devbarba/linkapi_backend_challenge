import axios, { AxiosRequestConfig } from 'axios';
import Config from '../configs';

export const pipeDriveConfigKey: string = new Config().keys.pipedrive;

class PipeDriveApi {
    public readonly pipeDriveConfigUrl: string = new Config().urls
        .pipeDriveBase;

    public pipeDriveInstace = axios.create({
        baseURL: this.pipeDriveConfigUrl,
    });
}

export default new PipeDriveApi().pipeDriveInstace;

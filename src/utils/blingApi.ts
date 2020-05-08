import axios from 'axios';
import Config from '../configs';

export const blingConfigKey: string = new Config().keys.bling;

class BlingApi {
    public readonly blingConfigUrl: string = new Config().urls.blingBase;

    public blingInstace = axios.create({
        baseURL: this.blingConfigUrl,
    });
}

export default new BlingApi().blingInstace;

import Deal from '../models/Deal';
import blingApi, { blingConfigKey } from '../utils/blingApi';
import AppError from '../errors/AppError';
import {
    BlingPayloadInterface,
    BlingReturnInterface,
} from '../interfaces/BlingInterface';
import { jsonToXml } from '../utils/jsonToXml';
import {
    DealStatus,
    DealPipeDriveInterface,
} from '../interfaces/PipeDriveInterface';

class CreateOrderService {
    async createOrder(
        payload: DealPipeDriveInterface
    ): Promise<BlingReturnInterface> {
        if (!payload || payload.status !== DealStatus.WON)
            throw new AppError(400, 'Oops, Don`t have body :/');

        const { data, status } = await blingApi.post<BlingReturnInterface>(
            'pedido/json',
            null,
            {
                params: {
                    apikey: blingConfigKey,
                    xml: jsonToXml(payload),
                },
            }
        );

        if (status < 200 || status > 299)
            throw new AppError(500, 'An unexpected error ocurred!');

        if (data.retorno.erros && data.retorno.erros.length)
            throw new AppError(400, data.retorno.erros[0].erro.msg);

        const verifyDeal = await Deal.findOne({
            dealId: payload.id.toString(),
        });

        if (!verifyDeal) {
            await Deal.create({
                dealId: payload.id,
                dealName: payload.title,
                clientName: payload.person_name,
                status: payload.status,
                date: payload.update_time,
                value: payload.value,
                currency: payload.currency,
            });
        }

        return data;
    }
}

export default CreateOrderService;

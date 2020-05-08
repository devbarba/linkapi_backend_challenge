import Deal from '../models/Deal';
import AppError from '../errors/AppError';

class CreateOrderService {
    async getOrder(): Promise<Deal[]> {
        const deals = await Deal.find({});

        if (!deals) throw new AppError(404, 'Oops, no Orders in DB! :/');

        return deals;
    }
}

export default CreateOrderService;

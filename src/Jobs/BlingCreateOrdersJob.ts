import Queue from '../queue';
import CreateOrderService from '../services/CreateOrderService';
import { Job } from 'kue';

class BlingCreateOrdersJob {
    async handle(deal: Job) {
        try {
            const createOrderService = await new CreateOrderService().createOrder(
                deal.data
            );
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BlingCreateOrdersJob().handle;

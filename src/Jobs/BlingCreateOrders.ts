import Queue from '../queue';
import CreateOrderService from '../services/CreateOrderService';
import { Job } from 'kue';

class BlingCreateOrders {
    async handle(deal: Job) {
        try {
            const createOrderService = await new CreateOrderService().createOrder(
                deal.data
            );

            // Queue.create('saveData', createOrderService)
            // .removeOnComplete(true)
            // .save();
        } catch (error) {
            console.log(error);
        }
    }
}

export default new BlingCreateOrders().handle;

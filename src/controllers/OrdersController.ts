import { Request, Response } from 'express';
import GetOrderService from '../services/GetOrderService';

export default class OrdersController {
    public async readOrders(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const readOrders = new GetOrderService();

            const orders = await readOrders.getOrder();

            return response.status(200).json(orders);
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }
}

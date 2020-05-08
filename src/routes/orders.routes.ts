import { Router, Response, Request } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersController = new OrdersController();

const orderRoutes = Router();

orderRoutes.get('/', (request: Request, response: Response) => {
    ordersController.readOrders(request, response);
});

export default orderRoutes;

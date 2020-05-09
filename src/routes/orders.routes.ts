import { Router, Response, Request } from 'express';
import OrdersController from '../controllers/OrdersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const ordersController = new OrdersController();

const orderRoutes = Router();

orderRoutes.use(ensureAuthenticated);

orderRoutes.get('/', (request: Request, response: Response) => {
    ordersController.readOrders(request, response);
});

export default orderRoutes;

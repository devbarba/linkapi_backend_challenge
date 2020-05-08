import { Router, Response, Request } from 'express';
import orderRoutes from './orders.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Welcome to Linkapi Challenge',
    });
});

routes.use('/orders', orderRoutes);

export default routes;

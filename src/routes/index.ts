import { Router, Response, Request } from 'express';
import orderRoutes from './orders.routes';
import usersRouter from './users.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Welcome to Linkapi Challenge',
    });
});

routes.use('/orders', orderRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

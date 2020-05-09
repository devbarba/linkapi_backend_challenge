import request from 'supertest';
import app from '../app';
import { token } from './mocks/tokenRequest.mock';
import Deal from '../models/Deal';

describe('`GET /orders`', () => {
    test('should return `200` with all orders', async () => {
        expect.assertions(3);

        const orderResponse = await request(app)
            .get(`/orders`)
            .set('Authorization', `Bearer ${token}`);

        const orderSearch = await Deal.findById(orderResponse.body[0]._id);

        if (orderSearch) {
            expect(orderSearch).toBeInstanceOf(Deal);
        }
        expect(orderResponse.status).toBe(200);
        expect(orderResponse.body).toBeDefined();
    });

    test('should return `401` no auth', async () => {
        expect.assertions(3);

        const orderResponse = await request(app).get(`/orders`);

        expect(orderResponse.status).toBe(401);
        expect(orderResponse.body).toBeDefined();

        expect(orderResponse.body).toMatchObject({
            status: 401,
            message: 'JWT Token is Missing.',
        });
    });
});

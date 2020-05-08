import request from 'supertest';
import app from '../../app';

export let token: string;

beforeAll((done) => {
    request(app)
        .post('/sessions')
        .send({
            email: 'lin@kapi.com',
            password: '123456',
        })
        .end((err, response) => {
            token = response.body.token;
            done();
        });
});

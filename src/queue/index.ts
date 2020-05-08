import kue, { Job, DoneCallback } from 'kue';
import Config from '../configs';
import PipeDriveImportDeals from '../Jobs/PipeDriveImportDeals';
import BlingCreateOrders from '../Jobs/BlingCreateOrders';

const redisConfig = new Config().redis;

const Queue = kue.createQueue({
    prefix: redisConfig.prefix,
    redis: {
        host: redisConfig.host,
        port: redisConfig.port,
        auth: redisConfig.pass,
    },
});

Queue.process('pipedrive', 1, async (job: Job, done: DoneCallback) => {
    try {
        PipeDriveImportDeals();
    } catch (error) {}

    done();
});

Queue.process('bling', 1, async (job: Job, done: DoneCallback) => {
    try {
        BlingCreateOrders(job);
    } catch (error) {}

    done();
});

Queue.process('saveData', 1, async (job: Job, done: DoneCallback) => {
    try {
        //
    } catch (error) {}

    done();
});

export default Queue;

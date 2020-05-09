import kue, { Job, DoneCallback } from 'kue';
import Config from '../configs';
import PipeDriveImportDealsJob from '../Jobs/PipeDriveImportDealsJob';
import BlingCreateOrdersJob from '../Jobs/BlingCreateOrdersJob';

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
        PipeDriveImportDealsJob();
    } catch (error) {}

    done();
});

Queue.process('bling', 1, async (job: Job, done: DoneCallback) => {
    try {
        BlingCreateOrdersJob(job);
    } catch (error) {}

    done();
});

export default Queue;

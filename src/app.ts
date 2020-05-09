import dotenv from 'dotenv';
import path from 'path';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import kue from 'kue';
import kueUi from 'kue-ui';
import cronJob from 'node-cron';
import 'express-async-errors';
import routes from './routes/index';
import connect from './database';
import Config from './configs';
import Queue from '../src/queue';
import errorMiddleware from './middlewares/errorMiddleware';

const mongoConfig = new Config().mongo;
dotenv.config();

class App {
    public server: Application;

    constructor() {
        this.server = express();
        this.mongo();
        this.middlewares();
        this.routes();
        this.queues();
        this.crons();
        this.errorHandling();
    }

    public mongo() {
        const db: string = mongoConfig.url;
        connect(db);
    }

    public queues() {
        kueUi.setup({
            apiURL: '/queues/api',
            baseURL: '/queues',
        });
    }

    public middlewares() {
        this.server.use(cors());
        this.server.use(express.static(path.join(__dirname, 'public')));
        this.server.use(bodyParser.json());
        this.server.use('/queues', kueUi.app);
        this.server.use('/queues/api', kue.app);
        this.server.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
    }

    private errorHandling() {
        this.server.use(errorMiddleware);
        this.server.use(errorHandler());
    }

    private crons() {
        cronJob.schedule('*/10 * * * *', () => {
            Queue.create('pipedrive', 1).removeOnComplete(true).save();
        });
    }

    private routes() {
        this.server.use(routes);
    }
}

export default new App().server;

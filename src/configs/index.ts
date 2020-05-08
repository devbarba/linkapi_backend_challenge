import dotenv from 'dotenv';
import MongoInterface from '../interfaces/MongoInterface';
import EnvironmentInterface from '../interfaces/EnvironmentInterface';
import ExpressInterface from '../interfaces/ExpressInterface';
import KeysInterface from '../interfaces/KeysInterface';
import RedisInterface from '../interfaces/RedisInterface';
import UrlInterface from '../interfaces/UrlInterface';

dotenv.config();

export default class Config {
    public express: ExpressInterface;

    public environment: EnvironmentInterface;

    public keys: KeysInterface;

    public urls: UrlInterface;

    public redis: RedisInterface;

    public mongo: MongoInterface;

    constructor() {
        this.express = {
            port: Number(process.env.PORT) || 3000,
            ip: process.env.IP || '127.0.0.1',
        };

        this.environment = {
            env: process.env.NODE_ENV || 'development',
            jwt: process.env.JWT_SECRET,
            ttl: process.env.JWT_TTL,
        };

        this.keys = {
            bling: process.env.BLING_API_KEY,
            pipedrive: process.env.PIPEDRIVE_API_KEY,
        };

        this.urls = {
            blingBase: process.env.BLING_URL,
            pipeDriveBase: process.env.PIPEDRIVE_URL,
        };

        this.redis = {
            port: process.env.REDIS_PORT,
            prefix: process.env.REDIS_PREFIX,
            host: process.env.REDIS_HOST,
            pass: process.env.REDIS_PASS,
        };

        this.mongo = {
            url: process.env.MONGO_URL,
            dbName: process.env.MONGO_DB_NAME,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
            port: process.env.MONGO_PORT,
        };
    }
}

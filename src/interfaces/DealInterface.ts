import { ObjectID } from 'mongodb';

export default interface DealInterface {
    _id: ObjectID;
    dealId: String;
    dealName: String;
    clientName: String;
    status: String;
    date: Date;
    value: Number;
    currency: String;
}

import { Document, Model, model, Schema } from 'mongoose';
import { ObjectID } from 'mongodb';

interface DealInterface extends Document {
    _id: ObjectID;
    dealId: String;
    dealName: String;
    clientName: String;
    status: String;
    date: Date;
    value: Number;
    currency: String;
}

const Deal = new Schema(
    {
        dealId: {
            type: Number,
            required: true,
        },
        dealName: String,
        clientName: String,
        status: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        currency: String,
    },
    { collection: 'opportunitiesWon', timestamps: true }
);

const DealModel: Model<DealInterface> = model<
    DealInterface,
    Model<DealInterface>
>('Deal', Deal);

export default DealModel;

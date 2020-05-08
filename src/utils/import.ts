import connect from '../database';
import Config from '../configs';
import UserInterface from '../interfaces/UserInterface';
import User from '../models/User';
import { getObjectId } from 'mongo-seeding';

const mongoConfig = new Config().mongo;

const user: UserInterface[] = [
    {
        _id: getObjectId('Linkapi'),
        id: 1,
        name: 'Linkapi',
        email: 'lin@kapi.com',
        password:
            '$2a$08$JLP2kQqz6Q/y0utPkpMXL.6.rQN8pH7ubz7c6k/vhgXyCLjVjvXtu',
    },
];

class ImportUser {
    constructor() {
        const db: string = mongoConfig.url;
        connect(db);
        this.importUser();
    }

    public async importUser(): Promise<void> {
        try {
            user.forEach(async (obj) => {
                const userToAdd = await User.findOne(
                    {
                        id: obj.id,
                    },
                    { $exists: true }
                );

                if (!userToAdd) {
                    await User.create(obj);
                }

                process.exit();
            });
        } catch (err) {}
    }
}

export default new ImportUser();

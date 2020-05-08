import Queue from '../queue';
import GetDealService from '../services/GetDealService';

class PipeDriveImportDealsJob {
    async handle() {
        try {
            const getDealService = await new GetDealService().getDeals();

            getDealService.forEach((deal) => {
                Queue.create('bling', deal).removeOnComplete(true).save();
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PipeDriveImportDealsJob().handle;

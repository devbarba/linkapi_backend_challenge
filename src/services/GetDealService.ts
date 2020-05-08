import pipeDriveApi, { pipeDriveConfigKey } from '../utils/pipeDriveApi';
import AppError from '../errors/AppError';
import {
    DealStatus,
    DealPipeDriveInterface,
    PipedriveReturnInterface,
} from '../interfaces/PipeDriveInterface';

class GetDealService {
    async getDeals(): Promise<DealPipeDriveInterface[]> {
        const { data, status } = await pipeDriveApi.get<
            PipedriveReturnInterface
        >('deals', {
            params: {
                status: DealStatus.WON,
                api_token: pipeDriveConfigKey,
            },
        });

        if (status < 200 || status > 299)
            throw new AppError(500, 'An unexpected error ocurred!');

        const pipeDriveReturn: DealPipeDriveInterface[] = data.data.map(
            (deal) => ({
                id: deal.id,
                title: deal.title,
                person_name: deal.person_name,
                value: deal.value,
                currency: deal.currency,
                update_time: deal.update_time,
                status: deal.status,
            })
        );

        return pipeDriveReturn;
    }
}

export default GetDealService;

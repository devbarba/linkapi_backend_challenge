export enum DealStatus {
    OPEN = 'open',
    WON = 'won',
    LOST = 'lost',
    DELETED = 'deleted',
}

export interface DealPipeDriveInterface {
    id: number;
    title: string;
    person_name: string;
    value: number;
    currency: string;
    update_time: string;
    status: DealStatus;
}

export interface PipedriveReturnInterface {
    data: DealPipeDriveInterface[];
}

import {atom} from 'recoil';
import {DEFAULT_ITEMS_PER_PAGE, PaginationDto} from '^types/utils/pagination.dto';

export const getPaginationState = (key: string) =>
    atom<PaginationDto>({
        key: `${key}/paginationState`,
        default: {page: 1, itemsPerPage: DEFAULT_ITEMS_PER_PAGE},
    });

export const orgIdParamState = atom({
    key: 'orgIdParamState',
    default: NaN,
});

export const applicationIdParamState = atom({
    key: 'applicationIdParamState',
    default: NaN,
});

export const billingHistoryIdParamState = atom({
    key: 'billingHistoryIdParamState',
    default: NaN,
});

import {CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto} from '^models/CodefBillingHistory/type';
import {api} from '^api/api';
import {paginatedDtoOf} from '^types/utils/response-of';

export const codefBillingHistoriesAdminApi = {
    index(params: FindAllCodefBillingHistoryAdminQueryDto) {
        const url = `/admin/codef-billing-histories`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefBillingHistoryDto));
    },
};

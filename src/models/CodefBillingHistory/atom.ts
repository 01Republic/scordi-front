import {pagedResourceAtom} from '^hooks/usePagedResource';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto} from '^models/CodefBillingHistory/type';

export const codefBillingHistoriesAdminAtom = pagedResourceAtom<
    CodefBillingHistoryDto,
    FindAllCodefBillingHistoryAdminQueryDto
>({
    key: 'codefBillingHistoriesAdminAtom',
});

import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';

export const getDay = (his: CodefBillingHistoryDto) => his.usedAt.getDate().toString();

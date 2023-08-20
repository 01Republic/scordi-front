export type RequestDto = {
    approvedListFile: File;
    overseasPurchaseListFile: File;
    categoryDBId: string;
    bankAccountDBId: string;
    aggCalendarDBId: string;
    moneyLogDBId: string;
    startDate?: Date;
    endDate?: Date;
};

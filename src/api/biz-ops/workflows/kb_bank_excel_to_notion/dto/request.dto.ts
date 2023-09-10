export type KBBankExcelToNotionRequestDto = {
    koBankingListFile: File; // 국내계좌내역 엑셀
    overseasBankingListFile: File; // 해외계좌내역 엑셀
    categoryDBId: string; // 카테고리 DB 아이디
    bankAccountDBId: string; // 은행/카드 DB 아이디
    aggCalendarDBId: string; // 집계 DB 아이디
    moneyLogDBId: string; // MoneyLog DB 아이디

    startDate?: string; // 시작일
    endDate?: string; // 종료일
};

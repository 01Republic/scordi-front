export const allColumnIds = [
    'checkBox', // 체크박스
    'subscriptionName', // 서비스 명
    'team', // 팀
    'status', // 상태
    'billingCycle', // 결제주기
    // "payingType", // 과금방식: (TestBank: 연, 고정, 사용량, 크레딧, 1인당)
    'amount', // 결제금액
    'lastPaidAt', // 최근결제일
    'memberCount', // 사용인원
    'payMethod', // 결제수단
    'master', // 담당자
    'note', // 비고
    'actions', // Actions
] as const;

export type ColumnId = (typeof allColumnIds)[number];

// 기본 정렬
export const defaultVisibleColumns: ColumnId[] = [
    'checkBox',
    'subscriptionName',
    'team',
    'status',
    'billingCycle',
    // "payingType",
    'amount',
    'lastPaidAt',
    'memberCount',
    'payMethod',
    'master',
    'note',
    'actions',
];

export const columnLabels: Record<ColumnId, string> = {
    checkBox: '',
    subscriptionName: '서비스명',
    team: '팀',
    status: '상태',
    billingCycle: '결제주기',
    // "payingType",
    amount: '결제금액',
    lastPaidAt: '최근결제일',
    memberCount: '사용인원',
    payMethod: '결제수단',
    master: '담당자',
    note: '비고',
    actions: '',
};

// 항상 보이게 할 컬럼
export const requiredColumns: ColumnId[] = [
    'checkBox',
    'subscriptionName',
    'team',
    'status',
    'memberCount',
    'master',
    'note',
    'actions',
];

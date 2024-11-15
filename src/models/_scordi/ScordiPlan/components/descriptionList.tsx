import React from 'react';

const basicPlanDescription = [
    '신규 회원 전용 플랜',
    ' ✓  팀별 이용중인 SaaS 구독 관리',
    ' ✓  결제 관리용 카드 연동 무제한',
    ' ✓  청구서 수신 이메일 연동 무제한',
    ' ✓  구글워크스페이스 구성원 계정 관리',
];

const supportPlanDescription = [
    '모든 베이직 플랜 기능 포함',
    <span className="text-scordi-500">✓ PG 결제내역 분류</span>,
    <span className="text-scordi-500">✓ SaaS 대량 등록</span>,
    <span className="text-scordi-500">✓ 비용변동 알림</span>,
    <span className="text-scordi-500">✓ 월간 SaaS 지출 리포트 발행</span>,
];

const customPlanDescription = [
    '모든 서포터 플랜 기능 포함',
    <span className="text-scordi-500">✓ 기업 맞춤형 기능 개발</span>,
    <span className="text-scordi-500">✓ 전담 담당자 배정</span>,
];

export const scordiPlanDescriptionList = [basicPlanDescription, supportPlanDescription, customPlanDescription];

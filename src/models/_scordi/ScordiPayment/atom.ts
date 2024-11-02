import {pagedResourceAtom} from '^hooks/usePagedResource';
import {DPayFindAllScordiPaymentQueryDto, FindAllScordiPaymentQueryDto, ScordiPaymentDto} from './type';

// 설정 - 결제관리 페이지 / 결제내역 섹션에서 사용
export const scordiPaymentsInSettingPageAtoms = pagedResourceAtom<ScordiPaymentDto, FindAllScordiPaymentQueryDto>({
    key: 'scordiPaymentsInSettingPageAtoms',
});

// d-pay / 결제내역 페이지에서 사용
export const dPayPaymentsInPaymentListPageAtoms = pagedResourceAtom<ScordiPaymentDto, DPayFindAllScordiPaymentQueryDto>(
    {
        key: 'dPayPaymentsInPaymentListPageAtoms',
    },
);

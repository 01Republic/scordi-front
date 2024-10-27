import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllScordiPaymentQueryDto, ScordiPaymentDto} from './type';

// 설정 - 결제관리 페이지 / 결제내역 섹션에서 사용
export const scordiPaymentsInSettingPageAtoms = pagedResourceAtom<ScordiPaymentDto, FindAllScordiPaymentQueryDto>({
    key: 'scordiPaymentsInSettingPageAtoms',
});

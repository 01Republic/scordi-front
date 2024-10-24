import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllScordiPaymentMethodQueryDto, ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';

// 설정 - 결제관리 페이지 / 카드정보 섹션에서 사용
export const scordiPaymentMethodsInSettingPageAtoms = pagedResourceAtom<
    ScordiPaymentMethodDto,
    FindAllScordiPaymentMethodQueryDto
>({
    key: 'scordiPaymentMethodsInSettingPageAtoms',
});

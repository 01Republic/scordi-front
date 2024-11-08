import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllTopLineBannersQueryDto, TopLineBannerDto} from '^models/TopLineBanner/type';

// 메인 레이아웃에서 전역으로 호출하는 탑라인 배너 리스트
export const topLineBannersAtom = pagedResourceAtom<TopLineBannerDto, FindAllTopLineBannersQueryDto>({
    key: 'topLineBannersAtom',
});

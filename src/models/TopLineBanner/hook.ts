import {usePagedResource} from '^hooks/usePagedResource';
import {topLineBannersAtom} from './atom';
import {topLineBannerApi} from './api';

// 메인 레이아웃에서 전역으로 호출하는 탑라인 배너 리스트
export const useTopLineBanners = () => {
    return usePagedResource(topLineBannersAtom, {
        useOrgId: true,
        endpoint: (params, orgId) => topLineBannerApi.index(orgId, params),
        getId: 'id',
    });
};

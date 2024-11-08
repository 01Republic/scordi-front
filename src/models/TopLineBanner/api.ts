import {FindAllTopLineBannersQueryDto, TopLineBannerDto} from '^models/TopLineBanner/type';
import {api} from '^api/api';
import {paginatedDtoOf} from '^types/utils/response-of';

export const topLineBannerApi = {
    index(orgId: number, params?: FindAllTopLineBannersQueryDto) {
        const url = `orgs/${orgId}/top-line-banners`;
        return api.get(url, {params}).then(paginatedDtoOf(TopLineBannerDto));
    },
};

import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export type LineBannerTheme = 'notice' | 'waring' | 'danger' | 'basicInfo' | 'thanksTo';

export class TopLineBannerDto {
    id: number;
    text: string;
    url?: string;
    animation?: boolean;
    fixed: boolean;
    closeButton: boolean;
    timeout: number | null;
    theme: LineBannerTheme;
}

export class FindAllTopLineBannersQueryDto extends FindAllQueryDto<TopLineBannerDto> {
    //
}

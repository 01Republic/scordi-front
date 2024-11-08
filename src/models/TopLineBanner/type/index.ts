import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export type LineBannerTheme = 'cardInfo' | 'emailInfo' | 'waring' | 'danger' | 'basicInfo' | 'thanksTo';

export class TopLineBannerDto {
    id: number;
    text: string;
    url?: string;
    animation?: boolean;
    fixed: boolean;
    timeout: number | null;
    theme: LineBannerTheme;
}

export class FindAllTopLineBannersQueryDto extends FindAllQueryDto<TopLineBannerDto> {
    //
}

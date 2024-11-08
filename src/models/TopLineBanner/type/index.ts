export type LineBannerTheme = 'cardInfo' | 'emailInfo' | 'waring' | 'danger' | 'basicInfo' | 'thanksTo';

export class TopLineBannerDto {
    id: number;
    text: string;
    url?: string;
    animation?: boolean;
    fixed: boolean;
    duration: number | null;
    theme: LineBannerTheme;
}

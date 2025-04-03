import {PencilLine} from 'lucide-react';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {ReactNode} from 'react';

export type LineBannerTheme = 'notice' | 'waring' | 'danger' | 'basicInfo' | 'thanksTo';
export type LineBannerType = 'text' | 'button' | 'link';

export class TopLineBannerDto {
    id: number | null;
    text: string;
    type: LineBannerType;
    theme: LineBannerTheme;
    icon?: ReactNode | null;
    animation?: boolean | null;
    fixed?: boolean | null;
    closeButton?: boolean | null;
    timeout?: number | null;
    url?: string | null;
    onClick?: () => void | null;
}

export class FindAllTopLineBannersQueryDto extends FindAllQueryDto<TopLineBannerDto> {
    //
}

export function getCreditCardPolicyDuration(company: string): string {
    console.log('company', company);

    const oneYear = ['BC', '수협', '제주', '광주', '전북', '국민', '우리', '하나', 'NH', '씨티'];
    const sixMonth = ['신한'];
    const threeMonth = ['삼성', '롯데', '현대'];

    if (oneYear.some((name) => company.includes(name))) {
        return '1년';
    } else if (sixMonth.some((name) => company.includes(name))) {
        return '6개월';
    } else if (threeMonth.some((name) => company.includes(name))) {
        return '3개월';
    }

    return '';
}

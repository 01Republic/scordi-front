import {memo, useEffect} from 'react';
import {TopLineBannerContent} from './TopLineBannerContent';
import {useTopLineBanners} from '^models/TopLineBanner/hook';
import {LineBannerTheme, TopLineBannerDto} from '^models/TopLineBanner/type';

const freePlanBanner: TopLineBannerDto[] = [
    {
        id: 1,
        text: '💳&nbsp;&nbsp; 12월 18일부터 유료화가 시작됩니다. 쿠폰코드를 적용해 50% 할인가에 구독해보세요!',
        animation: false,
        fixed: false,
        timeout: null,
        theme: 'notice',
        url: '/orgs/:orgId/settings/payments',
    },
];

export const TopLineBannerContainer = memo(() => {
    const {result, search} = useTopLineBanners();

    useEffect(() => {
        search({itemsPerPage: 0});
    }, []);

    const reversedBanners = result.items.slice().reverse();

    return (
        <div className={`relative overflow-hidden flex flex-col-reverse`}>
            {freePlanBanner.map((banner) => (
                <TopLineBannerContent key={banner.id} topLineBanner={banner} />
            ))}
        </div>
    );
});
TopLineBannerContainer.displayName = 'TopLineBannerContainer';

import {memo, useEffect, useState} from 'react';
import {topLineBanners} from './mock-data';
import {TopLineBannerContent} from './TopLineBannerContent';
import {TopLineBannerDto} from '^models/TopLineBanner/type';

export const TopLineBannerContainer = memo(() => {
    const [banners, setBanners] = useState<TopLineBannerDto[]>([]);

    useEffect(() => {
        setBanners(topLineBanners);
    }, []);

    const reversedBanners = banners.slice().reverse();

    return (
        <div className={`relative overflow-hidden flex flex-col-reverse`}>
            {reversedBanners.map((banner) => (
                <TopLineBannerContent key={banner.id} topLineBanner={banner} />
            ))}
        </div>
    );
});
TopLineBannerContainer.displayName = 'TopLineBannerContainer';

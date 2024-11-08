import {memo, useEffect} from 'react';
import {TopLineBannerContent} from './TopLineBannerContent';
import {useTopLineBanners} from '^models/TopLineBanner/hook';

export const TopLineBannerContainer = memo(() => {
    const {result, search} = useTopLineBanners();

    useEffect(() => {
        search({itemsPerPage: 0});
    }, []);

    const reversedBanners = result.items.slice().reverse();

    return (
        <div className={`relative overflow-hidden flex flex-col-reverse`}>
            {reversedBanners.map((banner) => (
                <TopLineBannerContent key={banner.id} topLineBanner={banner} />
            ))}
        </div>
    );
});
TopLineBannerContainer.displayName = 'TopLineBannerContainer';

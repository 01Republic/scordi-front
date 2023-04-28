import React, {memo} from 'react';

interface MarqueeMovingProps {
    imageUrls: string[];
    reverse?: boolean;
}

export const MarqueeMoving = memo((props: MarqueeMovingProps) => {
    const {imageUrls, reverse = false} = props;

    return (
        <div className="w-full relative" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
            <div className="h-[40px] md:h-[100px] w-full" />
            <div
                className={`items-center justify-between ${reverse ? 'marqueeMoving-reverse' : 'marqueeMoving'} top-0`}
            >
                {imageUrls.map((imageUrl, i) => (
                    <div key={i}>
                        <img src={imageUrl} />
                    </div>
                ))}
                {imageUrls.map((imageUrl, i) => (
                    <div key={i}>
                        <img src={imageUrl} />
                    </div>
                ))}
            </div>
        </div>
    );
});

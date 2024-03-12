import React, {memo, useEffect, useState} from 'react';

interface LoadingDotSeriesProps {
    dotCount?: number;
    speed?: number;
    widthFixed?: boolean;
}

export const LoadingDotSeries = memo((props: LoadingDotSeriesProps) => {
    const {dotCount = 3, speed = 1, widthFixed = false} = props;
    const [loadingCount, setLoadingCount] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingCount((i) => i + 1);
        }, 750 / speed);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const hiddenClass = widthFixed ? 'invisible' : 'hidden';

    return (
        <>
            {Array.from(Array(dotCount)).map((_, i) => (
                <span key={i} className={`text-gray-400 ${loadingCount % dotCount < i ? hiddenClass : ''}`}>
                    .
                </span>
            ))}
        </>
    );
});
LoadingDotSeries.displayName = 'LoadingDotSeries';

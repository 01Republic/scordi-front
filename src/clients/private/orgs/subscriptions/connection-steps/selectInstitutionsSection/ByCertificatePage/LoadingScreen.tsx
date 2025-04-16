import {Fragment, useEffect, useState} from 'react';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import NumberFlow from '@number-flow/react';

interface LoadingScreenProps {
    message?: string;
    onComplete: () => void;
}

const PROGRESS_SCHEDULE = [3, 7, 12, 18, 32, 45, 63, 79, 88, 100];

export default function LoadingScreen({
    message = '은행사를 기준으로 계좌를 찾고 있어요',
    onComplete,
}: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentIndex = 0;
        const intervalTime = 20000 / PROGRESS_SCHEDULE.length; // 20 seconds divided by 10 steps

        const interval = setInterval(() => {
            if (currentIndex < PROGRESS_SCHEDULE.length) {
                setProgress(PROGRESS_SCHEDULE[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(interval);
                onComplete();
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center m-auto">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                    {message.split('\n').map((line, i) => (
                        <Fragment key={i}>
                            {line}
                            {i < message.split('\n').length - 1 && <br />}
                        </Fragment>
                    ))}
                </h2>
            </div>

            <div className="w-64">
                <DotLottieReact src="/images/lottie/loading.lottie" loop autoplay />
            </div>

            <div className="text-primaryColor-900 text-lg font-medium">
                <NumberFlow value={progress} duration={800} />% 완료
            </div>
        </div>
    );
}

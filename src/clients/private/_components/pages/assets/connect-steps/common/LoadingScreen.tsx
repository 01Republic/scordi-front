import {Fragment, useEffect, useState} from 'react';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import NumberFlow from '@number-flow/react';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {useRouter} from 'next/router';

interface LoadingScreenProps {
    message?: string;
    onCreat?: () => void;
    onClose: () => void;
}

const PROGRESS_SCHEDULE = [3, 7, 12, 18, 32, 45, 63, 79, 88, 100];

export const LoadingScreen = (props: LoadingScreenProps) => {
    const {message = '조금만 기다려 주세요!', onCreat, onClose} = props;

    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!router.isReady) return;
        onCreat && onCreat();
    }, []);

    useEffect(() => {
        let currentIndex = 0;
        const intervalTime = 20000 / PROGRESS_SCHEDULE.length; // 20 seconds divided by 10 steps

        const interval = setInterval(() => {
            if (currentIndex < PROGRESS_SCHEDULE.length) {
                setProgress(PROGRESS_SCHEDULE[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(interval);
                onClose();
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <PureLayout>
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
        </PureLayout>
    );
};

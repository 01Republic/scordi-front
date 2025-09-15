import {Fragment, ReactNode, useEffect, useState} from 'react';
import NumberFlow from '@number-flow/react';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';

interface LoadingScreenProps extends WithChildren {
    message?: string;
    onCreat?: () => void;
    onClose: () => void;
}

const PROGRESS_SCHEDULE = [3, 7, 12, 18, 32, 45, 63, 79, 88, 100];

export const LoadingScreen = (props: LoadingScreenProps) => {
    const {message = '조금만 기다려 주세요!', onCreat, onClose, children} = props;

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
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight whitespace-pre-line">{message}</h2>
                </div>

                <div className="w-64">
                    <Lottie src={LOTTIE_SRC.LOADING_BUBBLE_SWIPE} loop autoplay />
                </div>

                {children || (
                    <div className="text-primaryColor-900 text-lg font-medium">
                        <NumberFlow value={progress} duration={800} />% 완료
                    </div>
                )}
            </div>
        </PureLayout>
    );
};

interface Props extends WithChildren {
    message?: ReactNode;
    percentage?: number; // 0 ~ 100
    onFinish?: () => void;
    minTimeout?: number;
    Button?: ReactNode;
}

export const LoadingScreen2 = (props: Props) => {
    const {message = '조금만 기다려 주세요!', percentage = 0, onFinish, minTimeout = 0, children, Button} = props;
    const [isWaited, setIsWaited] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsWaited(true), minTimeout);
    }, []);

    useEffect(() => {
        if (percentage >= 100) setIsFinished(true);
    }, [percentage]);

    useEffect(() => {
        if (isWaited && isFinished) {
            onFinish && onFinish();
        }
    }, [isWaited, isFinished]);

    return (
        <PureLayout>
            <PureLayoutContainer className="flex flex-col items-center justify-center m-auto">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">{message}</h2>
                </div>

                <div className="w-64">
                    <Lottie src={LOTTIE_SRC.LOADING_BUBBLE_SWIPE} loop autoplay />
                </div>

                {children || (
                    <div className="text-primaryColor-900 text-lg font-medium">
                        <NumberFlow value={percentage} duration={800} />% 완료
                    </div>
                )}
                {Button && <div className="w-64 mt-2">{Button}</div>}
            </PureLayoutContainer>
        </PureLayout>
    );
};

import {Fragment} from 'react';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';

interface LoadingScreenProps {
    progress?: number;
    message?: string;
}

export default function LoadingScreen({
    progress = 28,
    message = '은행사를 기준으로 계좌를 찾고 있어요',
}: LoadingScreenProps) {
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

            <div className="text-primaryColor-900 text-lg font-medium">{progress}% 완료</div>
        </div>
    );
}

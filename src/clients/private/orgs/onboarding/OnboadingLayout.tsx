import {ArrowLeft} from 'lucide-react';
import {memo} from 'react';

interface OnboadingLayoutProps {
    step: number;
    title: string;
    description: string;
    button: React.ReactNode;
    image: string;
    onBack?: () => void;
    onSkip?: () => void;
}

export const OnboadingLayout = memo<OnboadingLayoutProps>(
    ({step, title, description, button, image, onBack, onSkip}) => {
        return (
            <div className="flex justify-between h-lvh bg-scordi">
                {/* 좌측 메뉴 영역 */}
                <div className="w-[540px] bg-gray-50">
                    <div className="flex items-center justify-between gap-10 p-8">
                        {onBack ? (
                            <div
                                className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500"
                                onClick={onBack}
                            >
                                <ArrowLeft className="w-6 h-6" />
                                뒤로가기
                            </div>
                        ) : (
                            <div />
                        )}
                        {onSkip && (
                            <div
                                className="flex items-center gap-2 hover:cursor-pointer hover:text-scordi-500"
                                onClick={onSkip}
                            >
                                건너뛰기
                            </div>
                        )}
                    </div>
                    {step === 1 ? (
                        <div className="flex justify-center pt-20 pb-24">
                            <img
                                src="/images/renewallogo/base_nav-logo.png"
                                alt="scordi symbol logo"
                                draggable={false}
                                loading="lazy"
                                className="w-[130px] p-[2px]"
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center py-24"></div>
                    )}
                    <div className="flex flex-col gap-10 min-w-[380px] px-16">
                        <div className="text-sm text-gray-500">{step}/3</div>
                        <div className="flex flex-col gap-5">
                            <div className="text-[40px] font-bold leading-[140%] whitespace-pre-line">{title}</div>
                            <div className="text-16 whitespace-pre-line text-gray-500">{description}</div>
                        </div>
                        {button}
                    </div>
                    <div></div>
                </div>
                {/* 우측 이미지 영역 */}
                <div className="flex flex-col justify-center items-end">
                    <img
                        src={image}
                        alt="subscription"
                        draggable={false}
                        loading="lazy"
                        className="h-full object-contain"
                    />
                </div>
            </div>
        );
    },
);

import {memo} from 'react';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {NextImage} from '^components/NextImage';
import {StaticImageData} from 'next/image';
import {auto} from '@popperjs/core';

interface OnboadingLayoutProps {
    step: number;
    title: string;
    description: string;
    button: React.ReactNode;
    image: StaticImageData;
    onBack?: () => void;
    onSkip?: () => void;
}

export const OnboardingLayout = memo<OnboadingLayoutProps>(
    ({step, title, description, button, image, onBack, onSkip}) => {
        return (
            <div className="flex sm:grid sm:grid-cols-5 lg:grid-cols-3 justify-between h-lvh">
                {/* 좌측 메뉴 영역 */}
                <div className="flex flex-col w-full sm:col-span-2 lg:col-span-1 bg-gray-50">
                    <div className="flex items-center justify-between gap-10 p-8">
                        {onBack ? <BackButton /> : <div />}
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
                        <div className="flex justify-center pt-20 pb-20 md:pb-24">
                            <NextImage
                                src="/images/renewallogo/base_nav-logo.png"
                                alt="scordi symbol logo"
                                draggable={false}
                                loading="lazy"
                                width={130}
                                height={130}
                                style={{width: auto, height: auto}}
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center py-24"></div>
                    )}
                    <div className="flex flex-col gap-10 px-10 md:px-12 xl:px-16">
                        <div className="flex items-start text-sm text-gray-500">{step}/3</div>
                        <div className="flex flex-col gap-5">
                            <div className="text-2xl xl:text-4xl font-bold leading-[140%] whitespace-pre-line">
                                {title}
                            </div>
                            <div className="md:text-14 lg:text-16 whitespace-pre-line text-gray-500">{description}</div>
                        </div>
                        {button}
                    </div>
                </div>
                {/* 우측 이미지 영역 */}
                <div className="hidden sm:block sm:relative sm:col-span-3 lg:col-span-2 md:h-full overflow-hidden">
                    <NextImage
                        src={image}
                        alt="subscription"
                        fill
                        style={{
                            objectFit: 'cover', // 높이에 맞춰 꽉 채우면서 좌우 잘림 허용
                            objectPosition: 'left center', // 왼쪽 기준으로 크롭
                        }}
                    />
                </div>
            </div>
        );
    },
);

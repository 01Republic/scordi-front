import {memo, ReactNode} from 'react';
import {StaticImageData} from 'next/image';
import {auto} from '@popperjs/core';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {NextImage} from '^components/NextImage';
import {ArrowLeft} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';

interface OnboardingLayoutProps {
    step: number;
    title: string;
    description: string;
    button: ReactNode;
    image: StaticImageData;
    onBack?: () => void;
    onSkip?: () => void;
}

export const OnboardingLayout = memo((props: OnboardingLayoutProps) => {
    const {step, title, description, button, image, onBack, onSkip} = props;
    return (
        <div className="flex sm:grid sm:grid-cols-5 lg:grid-cols-3 justify-between h-lvh">
            {/* 좌측 메뉴 영역 */}
            <div className="flex flex-col w-full sm:col-span-2 lg:col-span-1 bg-gray-50">
                <div className="flex items-center justify-between gap-10 p-8">
                    {onBack ? (
                        <LinkTo
                            className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                            onClick={onBack}
                            displayLoading={false}
                        >
                            <ArrowLeft />
                            뒤로가기
                        </LinkTo>
                    ) : (
                        <div />
                    )}

                    <LinkTo
                        className={`flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold ${
                            !!onSkip ? '' : 'invisible'
                        }`}
                        onClick={onSkip}
                        displayLoading={false}
                    >
                        건너뛰기
                    </LinkTo>
                </div>

                <div className="flex justify-center pt-12 pb-20">
                    <NextImage
                        src="/images/renewallogo/base_nav-logo.png"
                        alt="scordi symbol logo"
                        draggable={false}
                        loading="lazy"
                        width={130}
                        height={130}
                        style={{width: auto, height: auto}}
                        className={`${step === 1 ? '' : 'invisible'}`}
                    />
                </div>

                <div className="flex flex-col gap-10 px-10 md:px-12 xl:px-16">
                    <div className="flex items-start text-sm text-gray-500">{step} / 3</div>
                    <div className="flex flex-col gap-5">
                        <div className="text-2xl xl:text-3xl font-bold leading-[140%] whitespace-pre-line">{title}</div>
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
                        objectFit: 'cover',
                        objectPosition: 'left center',
                    }}
                />
            </div>
        </div>
    );
});

import {memo, useEffect, useState} from 'react';
import {IoCloseOutline} from 'react-icons/io5';
import {WithChildren} from '^types/global.type';
import {Transition} from '@headlessui/react';
import {LinkTo} from '^components/util/LinkTo';
import {LineBannerTheme} from '^models/TopLineBanner/type';

interface TopLineBannerContentProps extends WithChildren {
    text: string;
    url?: string;
    stayTime?: number;
    animation?: boolean;
    individual: boolean;
    duration: number | null;
    theme: LineBannerTheme;
}

export const TopLineBannerContent = memo((props: TopLineBannerContentProps) => {
    const {text, url, stayTime, animation, individual, duration, theme} = props;
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (!duration) return;
        if (duration) {
            const timer = setTimeout(() => setIsOpen(false), duration);
            return () => clearTimeout(timer);
        }
    }, [duration]);

    return (
        <div className="relative overflow-hidden h-[3.3rem]">
            <Transition
                show={isOpen}
                enter={animation ? 'transition-transform duration-1000' : ''}
                enterFrom={animation ? '-translate-y-full' : ''}
                enterTo="translate-y-0"
                leave={animation ? 'transition-transform duration-1000' : ''}
                leaveFrom="translate-y-0"
                leaveTo={animation ? '-translate-y-full' : ''}
                className={` top-0 left-0 w-full ${individual ? 'relative' : 'absolute'}`}
            >
                <div
                    className={` w-full h-[3.3rem] flex items-center justify-center text-lg text-white ${topLineBannerThemeClass(
                        theme,
                    )} `}
                >
                    {url ? (
                        <LinkTo href={url} target="_blank" className="w-full flex items-center justify-center">
                            <span>{text}</span>
                        </LinkTo>
                    ) : (
                        <div className="w-full flex items-center justify-center">
                            <span>{text}</span>
                        </div>
                    )}
                    {stayTime ? null : (
                        <IoCloseOutline
                            size={14}
                            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-[#353535] cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </Transition>
        </div>
    );
});
TopLineBannerContent.displayName = 'TopLineBannerContent';

function topLineBannerThemeClass(theme: LineBannerTheme) {
    return {
        cardInfo: 'bg-[#9D9FF5]',
        emailInfo: 'bg-[#5C5FEE]',
        waring: 'bg-red-400',
        danger: '',
        basicInfo: '',
        thanksTo: 'bg-[#FBCFE8] !text-[#E22186]',
    }[theme];
}

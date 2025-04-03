import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {LinkTo} from '^components/util/LinkTo';
import {currentOrgAtom} from '^models/Organization/atom';
import {PencilLine, X, TriangleAlert, CircleAlert, Heart} from 'lucide-react';
import {LineBannerTheme} from '^models/TopLineBanner/type';
import {topLineBannerAtom} from '^atoms/common';

export const TopLineBanner = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const [isOpen, setIsOpen] = useState(true);
    const topLineBanner = useRecoilValue(topLineBannerAtom);

    if (!topLineBanner || !topLineBanner.id) return <></>;
    const {id, text, type, theme} = topLineBanner;
    const {url, onClick} = topLineBanner;
    const {animation, icon, fixed, closeButton, timeout} = topLineBanner;

    // useEffect(() => {
    //     if (!timeout) return;
    //
    //     const timer = setTimeout(() => setIsOpen(false), timeout);
    //     return () => clearTimeout(timer);
    // }, [timeout]);

    const temporaryUrl = url ? makeUrl(url, {orgId: currentOrg?.id}) : '';
    const displayIcon = icon ?? defaultThemeIcon(theme);

    return (
        <div
            id={`topLineBanner-${id}`}
            className={`w-full h-0 top-0 left-0 overflow-hidden transition-all duration-500 ${
                isOpen ? '!h-[3rem]' : ''
            } ${fixed ? 'absolute top-0 z-[999]' : 'relative'}`}
        >
            <div
                className={`w-full h-[3rem] flex items-center justify-center text-14 text-white font-medium ${topLineBannerThemeClass(
                    theme,
                )} `}
            >
                {type === text && (
                    <div className="w-full flex items-center justify-center">
                        {displayIcon}
                        <p dangerouslySetInnerHTML={{__html: text}} />
                    </div>
                )}

                {type === 'button' && (
                    <button
                        type="button"
                        onClick={onClick}
                        className="w-full flex items-center justify-center gap-1 text-18"
                    >
                        {displayIcon}
                        <p dangerouslySetInnerHTML={{__html: text}} />
                    </button>
                )}

                {type === 'link' && (
                    <LinkTo
                        href={temporaryUrl}
                        target={temporaryUrl.startsWith('http') ? '_blank' : undefined}
                        className="w-full flex items-center justify-center"
                    >
                        {displayIcon}
                        <p dangerouslySetInnerHTML={{__html: text}} />
                    </LinkTo>
                )}

                {timeout || !closeButton ? (
                    ''
                ) : (
                    <X
                        size={14}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>
        </div>
    );
});
TopLineBanner.displayName = 'TopLineBanner';

function topLineBannerThemeClass(theme: LineBannerTheme) {
    return {
        notice: 'bg-[#A3E635] !text-black',
        waring: 'bg-red-400',
        danger: '',
        basicInfo: '',
        thanksTo: 'bg-[#FBCFE8] !text-[#E22186]',
    }[theme];
}

function makeUrl(baseUrl: string, data: Record<string, any>) {
    let url = baseUrl;
    Object.entries(data).forEach(([key, value]) => {
        url = url.replaceAll(`:${key}`, value);
    });
    return url;
}

export const defaultThemeIcon = (theme: LineBannerTheme) => {
    switch (theme) {
        case 'notice':
            return <PencilLine />;
        case 'waring':
            return <TriangleAlert className="text-red-400 fill-white size-5" />;
        case 'danger':
            return <CircleAlert />;
        case 'thanksTo':
            return <Heart />;
        default:
            return null;
    }
};

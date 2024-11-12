import {memo, useEffect, useState} from 'react';
import {IoCloseOutline} from 'react-icons/io5';
import {WithChildren} from '^types/global.type';
import {LinkTo} from '^components/util/LinkTo';
import {LineBannerTheme, TopLineBannerDto} from '../type';
import {useCurrentOrg} from '^models/Organization/hook';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

interface TopLineBannerContentProps extends WithChildren {
    topLineBanner: TopLineBannerDto;
}

export const TopLineBannerContent = memo((props: TopLineBannerContentProps) => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    console.log(currentOrg?.id);
    const [isOpen, setIsOpen] = useState(true);
    const {topLineBanner} = props;
    const {id, text, url, timeout, theme, fixed, closeButton, animation} = topLineBanner;

    useEffect(() => {
        if (!timeout) return;

        const timer = setTimeout(() => setIsOpen(false), timeout);
        return () => clearTimeout(timer);
    }, [timeout]);

    const temporaryUrl = url ? makeUrl(url, {orgId: currentOrg?.id}) : '';

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
                {temporaryUrl ? (
                    <LinkTo
                        href={temporaryUrl}
                        target={temporaryUrl.startsWith('http') ? '_blank' : undefined}
                        className="w-full flex items-center justify-center"
                    >
                        <p dangerouslySetInnerHTML={{__html: text}} />
                    </LinkTo>
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <p dangerouslySetInnerHTML={{__html: text}} />
                    </div>
                )}
                {timeout || !closeButton ? (
                    ''
                ) : (
                    <IoCloseOutline
                        size={14}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-[#353535] cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>
        </div>
    );
});
TopLineBannerContent.displayName = 'TopLineBannerContent';

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

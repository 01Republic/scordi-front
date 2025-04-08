import {memo, ReactNode, useState} from 'react';
import {useRecoilValue} from 'recoil';
import cn from 'classnames';
import {PencilLine, X, TriangleAlert, CircleAlert, Heart} from 'lucide-react';
import {currentOrgAtom} from '^models/Organization/atom';
import {LinkTo} from '^components/util/LinkTo';
import {PageFlashPortal} from '^components/util/TopLineBannerPortal';
import {PageFlashTheme, PageFlashType} from '^models/TopLineBanner/type';

interface PageFlashProps {
    id: number;
    text: string;
    type: PageFlashType;
    theme: PageFlashTheme;
    icon?: ReactNode;
    url?: string;
    onClick?: () => void;
    animation?: boolean;
    fixed?: boolean;
    closeButton?: boolean;
    timeout?: number;
}

export const PageFlash = memo((props: PageFlashProps) => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const [isOpen, setIsOpen] = useState(true);

    const {id, text, type = 'text', theme = 'notice'} = props;
    const {url, onClick} = props;
    const {animation = false, icon, fixed = false, closeButton = false, timeout} = props;

    // useEffect(() => {
    //     if (!timeout) return;
    //
    //     const timer = setTimeout(() => setIsOpen(false), timeout);
    //     return () => clearTimeout(timer);
    // }, [timeout]);

    const temporaryUrl = url ? makeUrl(url, {orgId: currentOrg?.id}) : '';
    const displayIcon = icon ?? defaultThemeIcon(theme);

    return (
        <PageFlashPortal>
            <div
                id={`topLineBanner-${id}`}
                className={`w-full top-0 left-0 overflow-hidden transition-all duration-500 ${
                    isOpen ? 'h-[3rem]' : 'h-0'
                } ${fixed ? 'absolute top-0 z-[999]' : 'relative'}`}
            >
                <div
                    className={cn(
                        'w-full h-[3rem] flex items-center justify-center text-14 text-white font-medium',
                        topLineBannerThemeClass(theme),
                    )}
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
        </PageFlashPortal>
    );
});
PageFlash.displayName = 'PageFlash';

function topLineBannerThemeClass(theme: PageFlashTheme) {
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

export const defaultThemeIcon = (theme: PageFlashTheme) => {
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

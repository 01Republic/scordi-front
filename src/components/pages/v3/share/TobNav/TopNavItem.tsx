import {memo, useEffect, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {IconType} from '@react-icons/all-files';

interface TopNavItemProps extends WithChildren {
    text: string;
    href: string;
    iconDefault: IconType;
    iconActivated: IconType;
    matched?: RegExp | string;
}

export const TopNavItem = memo((props: TopNavItemProps) => {
    const {text, href, matched, iconDefault: DefaultIcon, iconActivated: ActiveIcon, children} = props;
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        matched ? setIsActive(!!router.asPath.match(matched)) : setIsActive(router.asPath.includes(href));
    }, [router.isReady]);

    const onClick = () => {
        router.push(href);
    };

    const textColor = isActive ? 'text-scordi-500' : 'text-gray-400 hover:text-scordi-500';
    const background = isActive ? 'bg-scordi-light-100' : 'hover:bg-scordi-light-100';

    return (
        <li>
            <a
                className={`flex flex-col gap-1 p-0 items-center justify-center w-12 h-12 rounded-md ${textColor} ${background}`}
                onClick={onClick}
            >
                {isActive ? <ActiveIcon size={20} /> : <DefaultIcon size={20} />}
                <span className="text-xs">{text}</span>
            </a>
        </li>
    );
});

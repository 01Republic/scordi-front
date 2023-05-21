import React, {AnchorHTMLAttributes, memo, useEffect, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';

type ActiveLinkToProps = AnchorHTMLAttributes<HTMLAnchorElement> &
    WithChildren & {
        href: string;
        text?: string;
        replace?: boolean;
        onClick?: () => any;
    };

export const ActiveLinkTo = memo((props: ActiveLinkToProps) => {
    const {children, href, text, replace = false, onClick} = props;
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(router.asPath === href);
    }, [router.isReady]);

    const onButtonClick = () => {
        if (onClick) onClick();
        replace ? router.replace(href) : router.push(href);
    };

    const textColor = isActive ? 'text-scordi-500' : 'hover:text-scordi-500';
    const background = isActive ? 'bg-scordi-light-100' : 'hover:bg-scordi-light-100';

    return (
        <a className={`rounded-xl font-[500] ${textColor} ${background}`} onClick={onButtonClick}>
            {text || children}
        </a>
    );
});

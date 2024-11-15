import {AnchorHTMLAttributes, HTMLAttributeAnchorTarget, memo, MouseEventHandler, useEffect, useState} from 'react';
import Link from 'next/link';
import {LinkProps} from 'next/dist/client/link';
import {ReactNodeLike} from 'prop-types';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {onlyPath} from '^utils/get-query-params';

export interface LinkToProps extends Partial<LinkProps> {
    text?: ReactNodeLike;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    target?: HTMLAttributeAnchorTarget;
    displayLoading?: boolean;
    loadingOnBtn?: boolean;
    disabled?: boolean;
    rel?: string;
    noFollow?: boolean;
}

export const LinkTo = memo((props: LinkToProps & WithChildren) => {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const {
        text = '',
        target,
        onClick,
        children,
        className = '',
        href = '#',
        displayLoading = true,
        loadingOnBtn = false,
        disabled = false,
        rel = '',
        noFollow = false,
        ...res
    } = props;

    useEffect(() => {
        if (router.isReady) setIsClicked(false);
    }, [router.isReady]);

    if (target === '_blank') {
        const attrs: AnchorHTMLAttributes<any> = {};
        if (href) attrs.href = `${href}`;
        if (onClick) attrs.onClick = onClick;
        return (
            <a className={className} {...attrs} target={target} rel="noopener noreferrer">
                {children || text}
            </a>
        );
    }

    if (onClick) {
        return (
            <a className={className} onClick={onClick} target={target} rel={rel}>
                {children || text}
            </a>
        );
    }

    if (isClicked) {
        if (displayLoading) {
            const loadingClass = loadingOnBtn ? 'link_to-loading' : 'link_to-clicked';
            return (
                <a className={`${className} ${loadingClass}`} target={target} rel={rel}>
                    {children || text}
                </a>
            );
        }
    }

    return (
        <Link href={disabled ? '' : href} rel={rel} {...res}>
            <a
                className={`${className}`}
                target={target}
                onClick={() => {
                    if (href == onlyPath(router)) return;
                    setIsClicked(true);
                }}
            >
                {children || text}
            </a>
        </Link>
    );
});
LinkTo.displayName = 'LinkTo';

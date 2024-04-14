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
}

export const LinkTo = memo((props: LinkToProps & WithChildren) => {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const {text = '', target, onClick, children, className = '', href = '#', displayLoading = true, ...res} = props;

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
            <a className={className} onClick={onClick} target={target}>
                {children || text}
            </a>
        );
    }

    if (isClicked) {
        if (displayLoading) {
            return (
                <a className={`${className} link_to-clicked`} target={target}>
                    {children || text}
                </a>
            );
        }
    }

    return (
        <Link href={href} {...res}>
            <a
                className={className}
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

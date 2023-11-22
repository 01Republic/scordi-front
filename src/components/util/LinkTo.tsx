import {AnchorHTMLAttributes, HTMLAttributeAnchorTarget, memo} from 'react';
import Link from 'next/link';
import {LinkProps} from 'next/dist/client/link';
import {ReactNodeLike} from 'prop-types';
import {WithChildren} from '^types/global.type';

export interface LinkToProps extends LinkProps {
    text?: ReactNodeLike;
    className?: string;
    onClick?: () => any;
    target?: HTMLAttributeAnchorTarget;
}

export const LinkTo = memo((props: LinkToProps & WithChildren) => {
    const {text = '', target, onClick, children, className = '', href, ...res} = props;

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

    return (
        <Link href={href} {...res}>
            <a className={className} target={target}>
                {children || text}
            </a>
        </Link>
    );
});
LinkTo.displayName = 'LinkTo';

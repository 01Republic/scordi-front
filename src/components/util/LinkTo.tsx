import {memo} from 'react';
import Link from 'next/link';
import {LinkProps} from 'next/dist/client/link';
import {ReactNodeLike} from 'prop-types';
import {WithChildren} from '^types/global.type';

export interface LinkToProps extends LinkProps {
    text?: ReactNodeLike;
    className?: string;
}

export const LinkTo = memo((props: LinkToProps & WithChildren) => {
    const {text = '', children, className = '', href, ...res} = props;

    return (
        <Link href={href} {...res}>
            <a className={className}>{children || text}</a>
        </Link>
    );
});
LinkTo.displayName = 'LinkTo';

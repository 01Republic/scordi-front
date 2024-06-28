import React, {HTMLAttributeAnchorTarget, memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';

interface TermLinkItemProps {
    name: string;
    href: string;
    target?: HTMLAttributeAnchorTarget;
}

export const TermLinkItem = memo((props: TermLinkItemProps) => {
    const {name, href, target = '_blank'} = props;
    return (
        <li>
            <LinkTo href={href} target={target} displayLoading={false} className="p-0 bg-transparent link link-hover">
                {name}
            </LinkTo>
        </li>
    );
});

import React, {HTMLAttributeAnchorTarget, memo} from 'react';

interface TermLinkItemProps {
    name: string;
    href: string;
    target?: HTMLAttributeAnchorTarget;
}

export const TermLinkItem = memo((props: TermLinkItemProps) => {
    const {name, href, target = '_blank'} = props;
    return (
        <li>
            <a href={href} className="p-0 bg-transparent link link-hover" target={target}>
                {name}
            </a>
        </li>
    );
});

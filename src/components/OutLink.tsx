import React, {HTMLAttributeAnchorTarget, memo, ReactNode} from 'react';
import {BiLinkExternal} from '^components/react-icons';
import {WithChildren} from '^types/global.type';

interface OutLinkProps {
    href: string;
    text?: string;
    target?: HTMLAttributeAnchorTarget;
    icon?: ReactNode;
}

const isLinkString = (str: string) => `${str}`.trim().startsWith('http');

export const OutLink = memo((props: OutLinkProps & WithChildren) => {
    const {href, text, target = '_blank', icon, children} = props;

    return (
        <>
            {isLinkString(href) ? (
                <a href={href} target={target} className="link text-gray-400 inline-flex items-center gap-1">
                    <span>{children || text || href}</span>
                    {icon ? icon : <BiLinkExternal size={11} />}
                </a>
            ) : (
                <a className="inline-flex items-center">{children || text || href}</a>
            )}
        </>
    );
});

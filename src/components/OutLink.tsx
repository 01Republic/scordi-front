import React, {HTMLAttributeAnchorTarget, memo} from 'react';
import {BiLinkExternal} from 'react-icons/bi';
import {WithChildren} from '^types/global.type';

interface OutLinkProps {
    href: string;
    target?: HTMLAttributeAnchorTarget;
}

const isLinkString = (str: string) => `${str}`.trim().startsWith('http');

export const OutLink = memo((props: OutLinkProps & WithChildren) => {
    const {href, target = '_blank', children} = props;

    return (
        <>
            {isLinkString(href) ? (
                <a href={href} target={target} className="link text-gray-400 inline-flex items-center gap-1">
                    <span>{children || href}</span>
                    <BiLinkExternal size={11} />
                </a>
            ) : (
                <a className="inline-flex items-center">{children || href}</a>
            )}
        </>
    );
});

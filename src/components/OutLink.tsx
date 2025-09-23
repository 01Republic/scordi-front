import React, {HTMLAttributeAnchorTarget, memo, ReactNode} from 'react';
import {ExternalLink} from 'lucide-react';
import {cn} from '^public/lib/utils';
import {WithChildren} from '^types/global.type';
import {LinkTo} from '^components/util/LinkTo';

interface OutLinkProps {
    href: string;
    text?: string;
    target?: HTMLAttributeAnchorTarget;
    icon?: ReactNode;
    className?: string;
}

export const isLinkString = (str: string) => {
    const protocols = ['http', 'mailto'];
    const sentence = `${str}`.trim();
    return !!protocols.find((protocol) => sentence.startsWith(protocol));
};

export const OutLink = memo((props: OutLinkProps & WithChildren) => {
    const {href, text, target = '_blank', icon, className = '', children} = props;

    return (
        <>
            {isLinkString(href) ? (
                <LinkTo
                    href={href}
                    target={target}
                    className={cn(`link text-gray-400 hover:text-gray-800 transition-all`, className)}
                >
                    {children || text || href}
                    <span className="inline-block relative top-0.5 ml-1"> {icon ? icon : <ExternalLink />}</span>
                </LinkTo>
            ) : (
                <a className="inline-flex items-center">{children || text || href}</a>
            )}
        </>
    );
});

export const OutLink2 = memo((props: OutLinkProps & WithChildren) => {
    const {href, text, target = '_blank', icon, className = '', children} = props;

    return (
        <>
            {isLinkString(href) ? (
                <LinkTo
                    href={href}
                    target={target}
                    className={cn(
                        `link text-gray-400 hover:text-gray-800 transition-all inline-flex items-center gap-1`,
                        className,
                    )}
                >
                    <span>{children || text || href}</span>
                    {icon ? icon : <ExternalLink size={11} />}
                </LinkTo>
            ) : (
                <a className="inline-flex items-center">{children || text || href}</a>
            )}
        </>
    );
});
